import React, { PureComponent } from 'react';
import toLower from 'lodash/toLower';
import PropTypes from '../../PropTypes';
import s from './styles';
import Tooltip from '../../components/Common/Tooltip';
import PhotoSettingPreview from '../PhotoSettingPreview';
import constants from '../../constants/constants';

class PhotoSetting extends PureComponent {
  static propTypes = {
    profilePhotoUrl: PropTypes.string.isRequired,
    photoStatus: PropTypes.oneOf(['add_photo', 'coming_soon', 'show_photo']).isRequired,
    gender: PropTypes.oneOf(['male', 'female']).isRequired,
    photoDisplaySetting: PropTypes.oneOf(['Show All', 'When I Contact', 'Only When I Contact', '']).isRequired,
    onSubmit: PropTypes.func.isRequired,
    photoSettingSaveSuccess: PropTypes.bool.isRequired,
  };
  static getPhotoDisplaySetting = props => (props.photoDisplaySetting || '').toLowerCase();
  static hasDisplaySettingChanged = (nextProps, prevState) => toLower(nextProps.photoDisplaySetting) !== prevState.photoDisplaySetting;
  static getDerivedStateFromProps = (nextProps, prevState) => ({
    photoDisplaySetting: toLower(nextProps.photoDisplaySetting),
    photoDisplaySettingSelected: PhotoSetting.hasDisplaySettingChanged(nextProps, prevState)
      ? toLower(nextProps.photoDisplaySetting)
      : prevState.photoDisplaySettingSelected,
    showMsgOnSubmit: PhotoSetting.hasDisplaySettingChanged(nextProps, prevState)
      ? nextProps.photoSettingSaveSuccess || nextProps.photoSettingSaveFail
      : prevState.showMsgOnSubmit,
    isMoreVisible: PhotoSetting.hasDisplaySettingChanged(nextProps, prevState)
      ? toLower(nextProps.photoDisplaySetting) !== constants.PHOTO_DISPLAY_SETTING.ONLY_WHEN_I_CONTACT_LC
      : prevState.isMoreVisible,
  });
  state = {
    photoDisplaySetting: toLower(this.props.photoDisplaySetting),
    photoDisplaySettingSelected: toLower(this.props.photoDisplaySetting),
    isMoreVisible: this.constructor.getPhotoDisplaySetting(this.props) !== constants.PHOTO_DISPLAY_SETTING.ONLY_WHEN_I_CONTACT_LC,
  };
  componentDidUpdate = () => this.state.showMsgOnSubmit && setTimeout(this.fadeOutMsg, 1500);
  onPhotoDisplaySettingChange = event => {
    const photoDisplaySettingSelected = event.target.value.toLowerCase();
    this.setState({
      photoDisplaySettingSelected,
    });
  };
  onSubmit = event =>
    this.state.photoDisplaySetting !== this.state.photoDisplaySettingSelected &&
    this.props.onSubmit(event, this.state.photoDisplaySettingSelected.replace(/\b\w/g, str => str.toUpperCase()));
  hasNoPhotos = () => toLower(this.props.photoStatus) === constants.PHOTO_STATUS.ADD_PHOTO;
  moreVisible = () => this.setState({ isMoreVisible: false });
  fadeOutMsg = () => this.setState({ showMsgOnSubmit: false });
  isPhotoSetting = setting => this.state.photoDisplaySettingSelected === setting;
  isSubmitBtnDisabled = () => this.state.photoDisplaySetting === this.state.photoDisplaySettingSelected;
  renderMoreBtn() {
    return (
      <s.MoreWrap id="more-visible-text" onClick={this.moreVisible}>
        <s.MorePhotoDivider>|</s.MorePhotoDivider>
        <s.PrivacyLink>More </s.PrivacyLink>
      </s.MoreWrap>
    );
  }
  renderVisibleToProfileILikeOpt() {
    return (
      <s.PhotoRadioWrap>
        <s.PhotoLabel>
          <s.VisibleMember
            type="radio"
            name="display_option"
            id={constants.PHOTO_DISPLAY_SETTING.ONLY_WHEN_I_CONTACT_LC.split(' ').join('_')}
            value={constants.PHOTO_DISPLAY_SETTING.ONLY_WHEN_I_CONTACT}
            onChange={this.onPhotoDisplaySettingChange}
            checked={this.isPhotoSetting(constants.PHOTO_DISPLAY_SETTING.ONLY_WHEN_I_CONTACT_LC)}
          />
          <s.VisibleMemberText>Only Visible to Members I like</s.VisibleMemberText>
        </s.PhotoLabel>
        <s.VisibleMemberText>
          <Tooltip
            isQuestionMark
            offset={[0, -5]}
            overlay={
              <span>
                &apos;Members I like&apos; are Members who you have either sent an Interest to or whose Interest you have Accepted
              </span>
            }
          />
        </s.VisibleMemberText>
      </s.PhotoRadioWrap>
    );
  }
  render() {
    return (
      <s.PhotoSettingWrap>
        <s.PhotoSetContaint>
          <s.PhotoHead>Choose display option</s.PhotoHead>
          <s.privacyLeftWrap>
            <s.PhotoRadioWrap isVisible>
              <s.PhotoLabel>
                <s.VisibleMember
                  type="radio"
                  name="display_option"
                  id={constants.PHOTO_DISPLAY_SETTING.SHOW_ALL_LC.split(' ').join('_')}
                  value={constants.PHOTO_DISPLAY_SETTING.SHOW_ALL}
                  onChange={this.onPhotoDisplaySettingChange}
                  checked={this.isPhotoSetting(constants.PHOTO_DISPLAY_SETTING.SHOW_ALL_LC)}
                />
                <s.VisibleMemberText>Visible to all Members</s.VisibleMemberText>
                <s.RecommendedImg />
              </s.PhotoLabel>
            </s.PhotoRadioWrap>
            <s.PhotoRadioWrap isVisible>
              <s.PhotoLabel>
                <s.VisibleMember
                  type="radio"
                  name="display_option"
                  id={constants.PHOTO_DISPLAY_SETTING.WHEN_I_CONTACT_LC.split(' ').join('_')}
                  value={constants.PHOTO_DISPLAY_SETTING.WHEN_I_CONTACT}
                  onChange={this.onPhotoDisplaySettingChange}
                  checked={this.isPhotoSetting(constants.PHOTO_DISPLAY_SETTING.WHEN_I_CONTACT_LC)}
                />
                <s.VisibleMemberText>Visible to Members I like and to all Premium Members</s.VisibleMemberText>
              </s.PhotoLabel>
              <s.VisibleMemberText>
                <s.tooltipWrap>
                  <Tooltip
                    isQuestionMark
                    offset={[0, -5]}
                    overlay={
                      <span>
                        &apos;Members I like&apos; are Members who you have either sent an Interest to or whose Interest you have Accepted
                      </span>
                    }
                  />
                </s.tooltipWrap>
                {this.state.isMoreVisible && this.renderMoreBtn()}
              </s.VisibleMemberText>
            </s.PhotoRadioWrap>
            {!this.state.isMoreVisible && this.renderVisibleToProfileILikeOpt()}
          </s.privacyLeftWrap>
          <s.SaveSettingBtn id="save-photo-display-setting" isDisabled={this.isSubmitBtnDisabled()} onClick={this.onSubmit}>
            Save my settings
          </s.SaveSettingBtn>
          <s.onSaveMessage isVisible={this.state.showMsgOnSubmit}>
            {this.props.photoSettingSaveSuccess ? 'Settings saved' : 'Something went wrong! Please try again!'}
          </s.onSaveMessage>
        </s.PhotoSetContaint>
        {!this.hasNoPhotos() && (
          <s.PhotoSettingPreviewWrap>
            <PhotoSettingPreview
              profilePhotoUrl={this.props.profilePhotoUrl}
              isVisibleToPremium={this.state.photoDisplaySettingSelected === constants.PHOTO_DISPLAY_SETTING.WHEN_I_CONTACT_LC}
              showLockIcon={this.state.photoDisplaySettingSelected !== constants.PHOTO_DISPLAY_SETTING.SHOW_ALL_LC}
              isPhotoScreened={this.props.photoStatus.toLowerCase() === constants.PHOTO_STATUS.SHOW_PHOTO}
              isUnderScreening={toLower(this.props.photoStatus) === constants.PHOTO_STATUS.COMING_SOON}
              gender={this.props.gender}
            />
          </s.PhotoSettingPreviewWrap>
        )}
      </s.PhotoSettingWrap>
    );
  }
}

export default PhotoSetting;
