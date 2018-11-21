/* eslint react/jsx-no-bind: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from '../../PropTypes';
import doModalAction from '../../actions/doModalAction';
import doProfileAction from '../../actions/doProfileAction';
import LeftSideNavigation from '../../components/Common/LeftSideNavigation';
import { UploadFromComputerBtn, ImportFromFbBtn } from '../../components/Common/Photo';
import s from './styles';
import PhotoSetting from '../../components/PhotoSetting';
import constants from '../../constants/constants';

class MyPhotosPage extends React.PureComponent {
  static renderLoader() {
    return (
      <s.LoaderBar>
        <img src="/assets/reg-loading.gif" width="220" height="19" alt="" />
      </s.LoaderBar>
    );
  }

  static getPhotoGuideLinesUrl(malePrefix, uri) {
    return `https://img.shaadi.com/imgs/registration/${malePrefix}${uri}`;
  }

  constructor(props) {
    super(props);
    const isPhotoSettingsTabVisible = this.props.location.hash === '#settings';
    const showLoader = !(
      (!isPhotoSettingsTabVisible && !props.selfProfile.photos.isDefault) ||
      (isPhotoSettingsTabVisible && props.selfProfile.privacy.photo)
    );
    this.state = {
      showLoader: !showLoader ? false : props.showLoader,
      selfProfile: props.selfProfile,
      malePrefix: '',
      lastPhotoOptOpenedKey: '',
      isPhotoSettingsTabVisible,
      profilePrivacyRequestSent: false,
      profilePhotosRequestSent: false,
      isPhotoAlbumsTabVisible: !isPhotoSettingsTabVisible,
      currentActiveTab: `photo-${!isPhotoSettingsTabVisible ? 'albums' : 'settings'}-tab`,
    };
    this.openPhotoGuidlineModal = this.openPhotoGuidlineModal.bind(this);
    this.getUserPhotoHtml = this.getUserPhotoHtml.bind(this);
    this.deletPhoto = this.deletPhoto.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedOut) {
      return false;
    }

    const { selfProfile } = nextProps;
    const isPhotoSettingsTabVisible = nextProps.location.hash === '#settings';
    const isPhotoAlbumsTabVisible = !isPhotoSettingsTabVisible;
    const currentActiveTab = `photo-${!isPhotoSettingsTabVisible ? 'albums' : 'settings'}-tab`;
    const newState = { ...this.state };
    const { uid } = this.props.selfProfile;
    const isPhotoAlbumFetched = !this.props.selfProfile.photos.isDefault;
    const isPrivacyFetched = !!this.props.selfProfile.privacy.photo;

    if (currentActiveTab !== this.state.currentActiveTab) {
      newState.currentActiveTab = currentActiveTab;
      newState.isPhotoSettingsTabVisible = isPhotoSettingsTabVisible;
      newState.isPhotoAlbumsTabVisible = isPhotoAlbumsTabVisible;
      newState.showLoader = true;
    }

    if (uid && !isPrivacyFetched && isPhotoSettingsTabVisible && !this.state.profilePrivacyRequestSent) {
      newState.showLoader = true;
      newState.profilePrivacyRequestSent = true;
      this.getPhotoDisplaySetting();
    }

    if (uid && !isPhotoAlbumFetched && isPhotoAlbumsTabVisible && !this.state.profilePhotosRequestSent) {
      newState.showLoader = true;
      newState.profilePhotosRequestSent = true;
      this.getPhotoAlbums();
    }

    if (
      ((isPhotoAlbumsTabVisible && !this.state.selfProfile.photos.isDefault) ||
        (isPhotoSettingsTabVisible && this.state.selfProfile.privacy.photo)) &&
      (this.state.showLoader || newState.showLoader)
    ) {
      newState.showLoader = false;
    }

    if (JSON.stringify(selfProfile) !== JSON.stringify(this.state.selfProfile)) {
      const { gender } = selfProfile;
      newState.selfProfile = selfProfile;
      newState.malePrefix = gender && gender.toLowerCase() === 'male' ? 'male-' : '';
      newState.lastPhotoOptOpenedKey = '';
    }

    this.setState(newState);
    return true;
  }

  onSubmit(event, photoDisplaySetting) {
    if (!this.props.selfProfile.photos.hasPhotos) {
      this.props.doModalAction('modal/simpleMessage', null, 'simpleMessage', {
        title: 'Message',
        content: 'You do not have any Photos, please add Photos to proceed.',
      });
      return false;
    }
    const requestBody = {
      data: {
        privacy: {
          photo: photoDisplaySetting,
        },
      },
      metadata: {
        tpe: {
          memberlogin: this.state.selfProfile.uid,
          posted_url: window.location.href,
          photo_track: 'Y',
          bucket: '',
          entry_point_referrer: document.referrer,
          previous_page_url: document.referrer,
          landing_page_url: window.location.href,
          landing_page_name: window.location.href,
          platform: 0,
          tpe_photo_medium: 'desktop',
        },
        profileid: this.props.selfProfile.uid,
        display_option: photoDisplaySetting,
      },
    };
    this.props.doProfileAction(
      'My Photos Page Settings Tab',
      this.props.selfProfile.uid,
      'updateProfilePreferencePrivacyPhoto',
      requestBody,
    );
    return true;
  }

  getUserPhotoHtml(photo, key) {
    const showPhotoOpts = this.showPhotoOpts.bind(this, photo, key);
    return (
      <s.PhotoUpload key={key}>
        <s.UploadImgWrap>
          <div>
            <img alt="Album Photos" src={photo.getUrlForAlbumPage} width="125" height="167" />
          </div>
        </s.UploadImgWrap>
        <s.photoDrap>
          {photo.getPhotoName}
          <s.Arrow
            className="photo-options"
            isVisible={photo.canShowPhotoOpts}
            upOrDown={photo.isPhotoOptsOpen ? 'up' : 'down'}
            onClick={showPhotoOpts}
          />
          {photo.canShowPhotoOpts && this.getPhotoOptionsHtml(photo, key)}
          <div>
            <s.Links>
              <div className="dropdown" />
            </s.Links>
          </div>
        </s.photoDrap>
      </s.PhotoUpload>
    );
  }

  getPhotoOptionsHtml(photo, key) {
    const makeProfilePhoto = this.makeProfilePhoto.bind(this, photo, key);
    const deletePhotoConfirmation = this.deletePhotoConfirmation.bind(this, photo, key);
    return (
      <s.DropdownWrap isVisible={photo.isPhotoOptsOpen}>
        <s.Links>
          <div />
        </s.Links>
        <s.photoDownbox>
          <ul>
            <s.PhotoActions isVisible={photo.canMakeProfilePhoto}>
              <s.Links className="make-profile-photo-btn" onClick={makeProfilePhoto}>
                Make Profile Photo
              </s.Links>
            </s.PhotoActions>
            <s.PhotoActions isVisible>
              <s.Links className="delete-photo-btn" onClick={deletePhotoConfirmation}>
                Delete Photo
              </s.Links>
            </s.PhotoActions>
          </ul>
        </s.photoDownbox>
      </s.DropdownWrap>
    );
  }

  getPhotoDisplaySetting() {
    const memberlogin = this.props.selfProfile.uid;
    const profileids = memberlogin;
    const fieldset = 'privacy';
    const params = { profileids, fieldset };
    this.props.doProfileAction('My Photos Page Setting Tab', memberlogin, 'getProfilePreferencePrivacy', params);
  }

  getPhotoAlbums() {
    const photoOpts = {
      fieldset: ['count', 'photos'],
      /* "profile_photo": "true", */
      size: [
        'small',
        'medium',
        'semilarge',
        'large',
        '40X40',
        '60X60',
        '120X120',
        '150X200',
        '250X310',
        '400X500',
        '450X600',
        '720X1006',
        '750X1333',
      ],
      blur: 'true',
    };
    if (this.props.webp === '1') {
      photoOpts.file_extension = 'webp';
    }
    const params = {
      _debug: 'getUserPhotos',
      photo_options: JSON.stringify(photoOpts),
    };
    this.props.doProfileAction('MyPhotoPage', this.state.selfProfile.uid, 'getUserPhotos', params);
  }

  makeTabVisible(clickedTab) {
    return this.state.currentActiveTab !== clickedTab;
  }

  makePhotoSettingsTabVisible() {
    return this.makeTabVisible('photo-settings-tab');
  }

  makePhotoAlbumsTabVisible() {
    return this.makeTabVisible('photo-albums-tab');
  }

  showPhotoOpts(photo, key, event) {
    const items = Object.assign({}, this.state.selfProfile.photos.items);
    items[key].isPhotoOptsOpen = !items[key].isPhotoOptsOpen;
    let lastPhotoOptOpenedKey = this.state.lastPhotoOptOpenedKey;
    if (typeof lastPhotoOptOpenedKey === 'number' && key !== lastPhotoOptOpenedKey) {
      items[lastPhotoOptOpenedKey].isPhotoOptsOpen = false;
    }
    lastPhotoOptOpenedKey = key;
    this.setState({
      ...this.state,
      ...{
        ...this.state.selfProfile,
        ...{
          ...this.state.selfProfile.photos,
          ...{
            items,
          },
        },
      },
      ...{ lastPhotoOptOpenedKey },
    });
  }

  showUserPhotos() {
    const photoHtml = this.state.selfProfile.photos.hasPhotos ? this.state.selfProfile.photos.items.map(this.getUserPhotoHtml) : '';
    return (
      <s.PhotoUploadMain>
        <s.PhotoUploadWrap>{photoHtml}</s.PhotoUploadWrap>
      </s.PhotoUploadMain>
    );
  }

  deletPhoto(photo, index, event) {
    const metadata = {
      tpe: {
        memberlogin: this.state.selfProfile.uid,
        posted_url: window.location.href,
        photo_track: 'Y',
        bucket: '',
        entry_point_referrer: document.referrer,
        previous_page_url: document.referrer,
        landing_page_url: window.location.href,
        landing_page_name: window.location.href,
        platform: 0,
        tpe_photo_medium: 'desktop',
      },
    };
    const data = {
      photo_order: photo.photo_order,
    };
    const requestBody = {
      data,
      metadata,
    };
    this.props.doProfileAction('MyPhotoPage', this.state.selfProfile.uid, 'deleteUserPhoto', requestBody);
  }

  deletePhotoConfirmation(photo, index, event) {
    this.props.doModalAction('modal/deletePhotoConfirmation', null, 'deletePhotoConfirmation', {
      onDelete: this.deletPhoto,
      photo,
      index,
      event,
    });
    this.showPhotoOpts(photo, index, event);
  }

  makeProfilePhoto(photo, index, event) {
    const photos = { photo_order: photo.photo_order };
    let fq = { photos };
    fq = JSON.stringify(fq);
    const queryParams = { fq };
    const metadata = {
      tpe: {
        memberlogin: this.state.selfProfile.uid,
        posted_url: window.location.href,
        photo_track: 'Y',
        bucket: '',
        entry_point_referrer: document.referrer,
        previous_page_url: document.referrer,
        landing_page_url: window.location.href,
        landing_page_name: window.location.href,
        platform: 0,
        tpe_photo_medium: 'desktop',
      },
    };
    const data = { profile_photo: true };
    const requestBody = { data, metadata };
    this.props.doProfileAction('MyPhotoPage', this.state.selfProfile.uid, 'updateUserPhoto', requestBody, queryParams);
  }

  openPhotoGuidlineModal() {
    this.props.doModalAction('modal/photoGuidelines', null, 'photoGuidelines');
  }

  showContent() {
    if (this.state.showLoader) {
      return this.constructor.renderLoader();
    }
    return this.state.isPhotoAlbumsTabVisible ? this.renderAlbumSection() : this.renderSettingSection();
  }

  renderAlbumSection() {
    return (
      <s.PhotoMainWrap isVisible={!this.state.isPhotoSettingsTabVisible}>
        <s.PhotoHeading isVisible={!this.state.selfProfile.photos.hasPhotos}>
          Get more responses by uploading up <br />
          to 20 photos on your profile.
        </s.PhotoHeading>

        <s.UploadBtnsWithNoteWrap isVisible={this.state.selfProfile.photos.canAddPhotos}>
          <s.UploadBtnWrap>
            <s.UploadphotoBlock>
              <span>Upload photos from your computer</span>
              <UploadFromComputerBtn
                text="Browse Photo"
                showIcon={false}
                width="153px"
                padding="10px 0"
                accept="image/jpg, image/jpeg, image/png, image/bmp, image/webp"
              />
            </s.UploadphotoBlock>
            <s.PhotoOr>OR</s.PhotoOr>
            <s.FbphotoBlock>
              <span>Add your best photos from Facebook</span>
              <ImportFromFbBtn
                onHoverBakGndColor="#3b5b9a"
                text="Import Photos"
                bakGndColor="#637bad"
                showIcon={false}
                fbBorder={false}
                padding="4px 10px 7px 11px"
                border="1px solid #29447e"
                margin="0 0 0 3px"
                useBackground
              />
            </s.FbphotoBlock>
          </s.UploadBtnWrap>

          <s.NoteTxt>
            Note: You can upload 20 photos to your profile. Each photos must be less than 15 MB and in jpg, gif, png, bmp or tiff format.<br />
            All photos uploaded are screened as per{' '}
            <s.NoteLink id="open-photo-guideline-note-link" onClick={this.openPhotoGuidlineModal}>
              Photo Guidelines
            </s.NoteLink>{' '}
            and 98% of those get activated within 2 hours.
          </s.NoteTxt>
        </s.UploadBtnsWithNoteWrap>

        {this.showUserPhotos()}
        <s.clear />
        <s.UploadPhotosTxt margin={this.state.selfProfile.photos.hasPhotos ? '35px 0 0;' : '0'}>
          Other ways to upload your photos
        </s.UploadPhotosTxt>
        <s.OtherWaymain>
          <s.OtherWay>
            <s.EmailIcon />
            <div className="fl font_12 line_height_18 other_reg_block">
              E-mail your photos to{' '}
              <a href="mailto:photos@shaadi.com?subject=Profile Photos - SH11546501&amp;body=Please attach Photo along with this mail and we will upload it to your profile.%0D%0AThanks">
                photos@shaadi.com
              </a>
              <br />Mention your Profile ID and Name in the mail.
            </div>
          </s.OtherWay>
          <s.OtherWay>
            <s.PiostIcon />
            <div className="fl font_12 line_height_18 other_reg_block">
              Send your photos through post to our{' '}
              <a target="_blank" href="/shaadi-info/index/contact-us">
                office
              </a>
              <br />Mention your Profile ID and Name at the back of the photos.
            </div>
          </s.OtherWay>
        </s.OtherWaymain>

        <s.PhotoShadow />
        <s.PhotoGuideline>
          <s.LeftGuideline>
            <s.PhotosUpload>Photos you can upload</s.PhotosUpload>
            <s.ImgMainContainer>
              <s.ImgContainer>
                <img
                  src={this.constructor.getPhotoGuideLinesUrl(this.state.malePrefix, 'closeup-v2.gif')}
                  alt="Close Up"
                  title="Close Up"
                />
                Close Up
              </s.ImgContainer>
              <s.ImgContainer>
                <img
                  src={this.constructor.getPhotoGuideLinesUrl(this.state.malePrefix, 'full-view-v2.gif')}
                  alt="Full View"
                  title="Full View"
                />
                Full View
              </s.ImgContainer>
            </s.ImgMainContainer>
          </s.LeftGuideline>
          <s.RightGuideline>
            <s.PhotosCancel>Photos you cannot upload</s.PhotosCancel>
            <s.ImgMainContainerNext>
              <s.ImgContainer>
                <img
                  src={this.constructor.getPhotoGuideLinesUrl(this.state.malePrefix, 'face-side-v2.gif')}
                  alt="Side Face"
                  title="Side Face"
                />
                Side Face
              </s.ImgContainer>
              <s.ImgContainer>
                <img src={this.constructor.getPhotoGuideLinesUrl(this.state.malePrefix, 'face-blur-v2.gif')} alt="Blur" title="Blur" />
                Blur
              </s.ImgContainer>
              <s.ImgContainer>
                <img src={this.constructor.getPhotoGuideLinesUrl(this.state.malePrefix, 'face-group.gif')} alt="Group" title="Group" />
                Group
              </s.ImgContainer>
              <s.ImgContainer>
                <img
                  src={this.constructor.getPhotoGuideLinesUrl(this.state.malePrefix, 'face-watermark-v2.gif')}
                  alt="Watermark"
                  title="Watermark"
                />
                Watermark
              </s.ImgContainer>
            </s.ImgMainContainerNext>
          </s.RightGuideline>
        </s.PhotoGuideline>
        <s.PhotosFaq>
          <s.Links id="open-photo-guideline-btm-link" onClick={this.openPhotoGuidlineModal}>
            Photo Guidelines
          </s.Links>
          &nbsp;&nbsp;| &nbsp;
          <s.Links target="_blank" href="/customer-relations/faq/photo">
            Photo FAQ
          </s.Links>
        </s.PhotosFaq>
      </s.PhotoMainWrap>
    );
  }

  renderSettingSection() {
    return (
      <PhotoSetting
        memberlogin={this.props.selfProfile.uid}
        onSubmit={this.onSubmit}
        gender={this.props.selfProfile && this.props.selfProfile.gender && this.props.selfProfile.gender.toLowerCase()}
        profilePhotoUrl={this.props.selfProfile.photos.hasPhotos ? this.props.selfProfile.photos.items[0].getUrlForAlbumPage : ''}
        photoStatus={this.props.selfProfile.photos.status}
        photoDisplaySetting={this.props.selfProfile.privacy.photo}
        photoSettingSaveFail={this.props.selfProfile.privacy.photoSettingSaveFail || false}
        photoSettingSaveSuccess={this.props.selfProfile.privacy.photoSettingSaveSuccess || false}
      />
    );
  }

  render() {
    if (this.props.isLoggedOut) {
      // call taken by Prathamesh to redirect to shaadi login
      this.props.doProfileAction('MyPhotosPage', undefined, constants.URI.loginPage);
      return null;
    }
    return (
      <s.MyPhotoPageWrap topSpace={this.props.topSpace} isChatOpen={this.props.isChatOpen} windowWidth={this.props.windowWidth}>
        <LeftSideNavigation />
        <s.ContentArea>
          <s.PageHead>My Photos</s.PageHead>
          <s.PhotoWrap showBoxShadow={!this.state.showLoader}>
            <s.SubtabsWrap>
              <s.SubtabsUl>
                <s.SubtabsLi>
                  <s.SubtabsLink to="#photos" id="photo-albums-tab" isActive={this.state.isPhotoAlbumsTabVisible}>
                    <span>Photo Album</span>
                  </s.SubtabsLink>
                </s.SubtabsLi>
                <s.SubtabsLi>
                  <s.SubtabsLink to="#settings" id="photo-settings-tab" isActive={this.state.isPhotoSettingsTabVisible}>
                    <span>Settings</span>
                  </s.SubtabsLink>
                </s.SubtabsLi>
              </s.SubtabsUl>
            </s.SubtabsWrap>
            {this.showContent()}
          </s.PhotoWrap>
        </s.ContentArea>
      </s.MyPhotoPageWrap>
    );
  }
}

MyPhotosPage.defaultProps = {
  showLoader: true,
};

MyPhotosPage.propTypes = {
  doProfileAction: PropTypes.func.isRequired,
  doModalAction: PropTypes.func.isRequired,
  isLoggedOut: PropTypes.bool.isRequired,
  topSpace: PropTypes.number.isRequired,
  selfProfile: PropTypes.shape(PropTypes.searchProfile).isRequired,
  showLoader: PropTypes.bool.isRequired,
  windowWidth: PropTypes.number.isRequired,
  isChatOpen: PropTypes.bool.isRequired,
  webp: PropTypes.string.isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
  }).isRequired,
};

MyPhotosPage.mapStateToProps = (state, { location }) => {
  const { chat, profiles, session, config, view } = state;
  const isLoggedOut = session.isLoggedOut;
  const wwwBaseUrl = config.app.wwwBaseUrl;
  const selfProfile = profiles.self;
  const webp = config.app.webp;
  const isChatOpen = chat.settings.isOpen;
  const windowWidth = view.width;
  const topSpace = view.topSpace;
  const props = {
    location,
    isLoggedOut,
    wwwBaseUrl,
    selfProfile,
    webp,
    isChatOpen,
    windowWidth,
    topSpace,
  };
  return props;
};

const maptDispatchToProps = { doProfileAction, doModalAction };

export default withRouter(connect(MyPhotosPage.mapStateToProps, maptDispatchToProps)(MyPhotosPage));
