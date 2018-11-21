import React, { PureComponent } from 'react';
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

class MyPhotosPage extends PureComponent {
  static mapStateToProps(state, { location }) {
    const { chat, profiles, session, view } = state;
    const isLoggedOut = session.isLoggedOut;
    const { photos, privacy, uid, gender } = profiles.self;
    const selfProfile = { photos, privacy, uid, gender };
    const isChatOpen = chat.settings.isOpen;
    const windowWidth = view.width;
    const topSpace = view.topSpace;
    const props = {
      isLoggedOut,
      location,
      selfProfile,
      isChatOpen,
      windowWidth,
      topSpace,
    };
    return props;
  }

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

  static getArrow(showPhotoOpts) {
    return (
      <s.ArrowWrap className="photo-options" onClick={showPhotoOpts}>
        <s.Arrow arrow="down" />
      </s.ArrowWrap>
    );
  }

  static getCaptionBelowImg(photo) {
    return (
      <s.photoStatusMsg tooltipVisible={photo.isPhotoRejected} makeRed={photo.isPhotoRejected}>
        {photo.getCaption}
      </s.photoStatusMsg>
    );
  }

  constructor(props) {
    super(props);
    const isPhotoSettingsTabVisible = props.location.hash === '#settings';
    this.state = {
      showLoader: props.showLoader,
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
    this.resetDropdown = this.resetDropdown.bind(this);
  }

  componentWillMount() {
    if (this.state.showLoader) {
      const { isPhotoAlbumsTabVisible, isPhotoSettingsTabVisible } = this.state;
      const { selfProfile: { privacy: { photo }, photos: { isDefault, isRejectedPhotosFetched } } } = this.props;
      const showLoader = !((isPhotoAlbumsTabVisible && !isDefault && isRejectedPhotosFetched) || (isPhotoSettingsTabVisible && photo));
      if (!showLoader) {
        this.setState({
          showLoader,
        });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoggedOut) {
      this.handleNewProps(nextProps);
    }
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
    const showPhotoOpts = event => this.showPhotoOpts(photo, key, event);
    return (
      <s.PhotoUpload key={key}>
        <s.UploadImgWrap>
          <s.ImgWrap>
            <s.Img alt="Album Photos" src={photo.getUrlForAlbumPage} />
            {photo.isPhotoRejected && [
              <s.InvalidWrap onClick={this.openPhotoGuidlineModal} key="invalid">
                <s.Invalid>
                  Please refer to our<br /> Photo Guidelines
                </s.Invalid>
              </s.InvalidWrap>,
              <s.ImgOverlay key="overlay" />,
            ]}
            {<s.captionWrap>{photo.getCaption}</s.captionWrap>}
            {photo.canShowPhotoOpts && !photo.isPhotoOptsOpen && this.constructor.getArrow(showPhotoOpts)}
            {photo.canShowPhotoOpts && this.getPhotoOptionsHtml(photo, key)}
          </s.ImgWrap>
        </s.UploadImgWrap>
      </s.PhotoUpload>
    );
  }

  getPhotoOptionsHtml(photo, key) {
    const makeProfilePhoto = event => this.makeProfilePhoto(photo, key, event);
    const deletePhotoConfirmation = event => this.deletePhotoConfirmation(photo, key, event);
    return (
      <s.DropdownWrap isVisible={photo.isPhotoOptsOpen} extendWidth={photo.canShowMakeProfilePhotoOpt}>
        <s.Links>
          <div />
        </s.Links>
        <s.photoDownbox>
          <ul>
            <s.PhotoActions isVisible={photo.canShowMakeProfilePhotoOpt}>
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

  getPhotoDisplaySetting(uid) {
    this.props.doProfileAction('My Photos Page Setting Tab', uid, 'getProfilePreferencePrivacy', { profileids: uid, fieldset: 'privacy' });
  }

  getPhotoAlbums(uid) {
    this.props.doProfileAction('MyPhotoPage', uid, 'getUserPhotos');
  }

  getRejectedAlbumPhotos(uid) {
    this.props.doProfileAction('MyPhotoPage', uid, 'getRejectedAlbumPhotos');
  }

  handleNewProps(nextProps) {
    const {
      selfProfile,
      selfProfile: { uid, privacy: { photo }, photos: { isDefault, isRejectedPhotosFetched } },
      location: { hash },
    } = nextProps;
    const isPhotoSettingsTabVisible = hash === '#settings';
    const isPhotoAlbumsTabVisible = !isPhotoSettingsTabVisible;
    const currentActiveTab = `photo-${!isPhotoSettingsTabVisible ? 'albums' : 'settings'}-tab`;
    const newState = { ...this.state };
    const isPrivacyFetched = !!photo;
    const isPhotoAlbumFetched = !isDefault;
    const areAllAlbumPhotosFetched = isPhotoAlbumFetched && isRejectedPhotosFetched;

    if (currentActiveTab !== this.state.currentActiveTab) {
      newState.currentActiveTab = currentActiveTab;
      newState.isPhotoSettingsTabVisible = isPhotoSettingsTabVisible;
      newState.isPhotoAlbumsTabVisible = isPhotoAlbumsTabVisible;
      newState.showLoader = true;
    }

    if (uid && !isPrivacyFetched && isPhotoSettingsTabVisible && !this.state.profilePrivacyRequestSent) {
      newState.showLoader = true;
      newState.profilePrivacyRequestSent = true;
      this.getPhotoDisplaySetting(uid);
    }

    if (uid && isPhotoAlbumsTabVisible && !areAllAlbumPhotosFetched && !this.state.profilePhotosRequestSent) {
      newState.showLoader = true;
      newState.profilePhotosRequestSent = true;
      if (!isPhotoAlbumFetched) {
        this.getPhotoAlbums(uid);
      } else if (!isRejectedPhotosFetched) {
        this.getRejectedAlbumPhotos(uid);
      }
    }

    if (
      ((isPhotoAlbumsTabVisible && areAllAlbumPhotosFetched) || (isPhotoSettingsTabVisible && isPrivacyFetched)) &&
      (this.state.showLoader || newState.showLoader)
    ) {
      newState.showLoader = false;
    }

    if (JSON.stringify(selfProfile) !== JSON.stringify(this.state.selfProfile)) {
      const { gender } = selfProfile;
      newState.selfProfile = selfProfile;
      if (gender && gender.toLowerCase() === 'male') {
        newState.malePrefix = 'male-';
      }
    }

    this.setState(newState);

    setTimeout(this.timeoutLoader.bind(this), 10000);
  }

  timeoutLoader() {
    this.setState({
      showLoader: false,
    });
  }

  resetDropdown() {
    const key = this.state.lastPhotoOptOpenedKey;
    if (typeof key !== 'number') {
      return false;
    }
    const lastPhotoOptOpenedKey = '';
    const items = { ...this.state.selfProfile.photos.items };
    if (items[key]) {
      items[key].isPhotoOptsOpen = false;
    }
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
    document.removeEventListener('click', this.resetDropdown);
    return true;
  }

  showPhotoOpts(photo, key, event) {
    const items = { ...this.state.selfProfile.photos.items };
    items[key].isPhotoOptsOpen = !items[key].isPhotoOptsOpen;
    let lastPhotoOptOpenedKey = this.state.lastPhotoOptOpenedKey;
    if (typeof lastPhotoOptOpenedKey === 'number' && key !== lastPhotoOptOpenedKey && items[lastPhotoOptOpenedKey]) {
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
    document.addEventListener('click', this.resetDropdown);
  }

  showUserPhotos() {
    const photoHtml = this.state.selfProfile.photos.items.map(this.getUserPhotoHtml);
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
    const modalName = photo.cantDeletePhotoReason ? 'simpleMessage' : 'deletePhotoConfirmation';
    const modalData = photo.cantDeletePhotoReason
      ? {
          title: 'Message',
          content: photo.cantDeletePhotoReason,
        }
      : {
          onDelete: this.deletPhoto,
          photo,
          index,
          event,
        };
    this.props.doModalAction(`modal/${modalName}`, null, modalName, modalData);
    if (photo.cantDeletePhotoReason) {
      this.showPhotoOpts(photo, index, event);
    }
    this.resetDropdown();
  }

  makeProfilePhoto(photo, index, event) {
    if (photo.cantMakeProfilePhotoReason) {
      this.props.doModalAction('modal/simpleMessage', null, 'simpleMessage', {
        title: 'Message',
        content: photo.cantMakeProfilePhotoReason,
      });
    } else {
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
    this.resetDropdown();
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
                source="Manage Photos"
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
                source="Manage Photos"
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
        {this.state.selfProfile.photos.items instanceof Array && this.showUserPhotos()}
        <s.clear />
        <s.UploadPhotosTxt margin={this.state.selfProfile.photos.hasPhotos ? '35px 0 0;' : '0'}>
          Other ways to upload your photos
        </s.UploadPhotosTxt>
        <s.OtherWaymain>
          <s.OtherWay>
            <s.EmailIcon />
            <div className="fl font_12 line_height_18 other_reg_block">
              E-mail your photos to{' '}
              <a
                href={`mailto:photos@shaadi.com?subject=Profile Photos - ${
                  this.state.selfProfile.uid
                }&body=Please attach Photo along with this mail and we will upload it to your profile.\nThanks Mention your Profile ID and Name in the mail.`}
              >
                photos@shaadi.com
              </a>
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

  renderTabs() {
    return (
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
    );
  }

  render() {
    if (this.props.isLoggedOut) {
      // call taken by Prathamesh to redirect to shaadi login
      this.props.history.push(constants.URI.loginPage);
      return null;
    }
    return (
      <s.MyPhotoPageWrap topSpace={this.props.topSpace} isChatOpen={this.props.isChatOpen} windowWidth={this.props.windowWidth}>
        <LeftSideNavigation />
        <s.ContentArea>
          <s.PageHead>My Photos</s.PageHead>
          {this.renderTabs()}
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
  }).isRequired,
};

const mapDispatchToProps = { doProfileAction, doModalAction };

export default withRouter(connect(MyPhotosPage.mapStateToProps, mapDispatchToProps)(MyPhotosPage));
