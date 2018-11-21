import React from 'react';
import PropTypes from '../../PropTypes';
import s from './styles';
import ReportBlockContact from '../Common/ReportBlockContact';
import InValidProfileItem from './InValidProfileItem';
import ProfileTitle from './ProfileTitle';
import ViewSms from './ViewSms';
import ProfilePhotoList from '../Common/ProfilePhotoList';

import { imageTitleConditionFn, getProfileItemDataFn } from './utils';

class ContactSummaryItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVeiwMsgClick: false,
      isBlockDisplay: true,
      isMisuseDisplay: true,
      isHelpDisplay: true,
      isHovered: false,
      isHandCursor: true,
    };
    this.popup = null;
  }

  onRequestPhoto = () => {
    this.props.doProfileAction('contactSummary', this.props.profileData.uid, 'requestPhoto');
  };

  onMouseEnter = () => {
    this.setState({
      isHovered: true,
    });
  };
  onMouseLeave = () => {
    this.setState({
      isHovered: false,
    });
  };
  onVeiwMsgClick = uid => {
    this.props.doProfileAction('contactSummary', uid, 'contactSummaryViewSms');
  };

  onFullPhotoClick = (uid, albumUrl, type) => {
    if (this.popup !== null && this.popup.closed) {
      this.popup = null;
    }
    const width = 750;
    const height = 582;

    const albumPath = this.state.activePhotoIndex === 0 ? albumUrl : `${albumUrl}/index/${this.state.activePhotoIndex}`;
    const left = ((window.screen.availWidth || 900) - width) / 2;
    const top = ((window.screen.availHeight || 800) - height) / 2;
    this.popup = window.open(albumPath, `popup_${uid}`, `height=${height},width=${width},scrollbars=yes,left=${left},top=${top}`);
  };
  onShowWatermarkInfo = () => {};
  onRequestPassword = () => {};

  render() {
    const {
      isSms,
      contactDetailsStatus,
      contactDetailsTitleStatus,
      profileContactStatus,
      isProfileHidden,
      profileName,
      isSettingsPaidUser,
      profileUid,
      loggerGender,
      profileUrl,
      profileThumbnailBlur,
      profileDetails,
      profileMembershipLevel,
      inValidProfile,
      actionDate,
    } = getProfileItemDataFn(this.props);

    const { profileData } = this.props;
    const contactInfo = profileData && profileData.contactSummary ? profileData.contactSummary : false;
    return (
      <s.inboxcontainer>
        {inValidProfile && (
          <InValidProfileItem
            loggerGender={loggerGender}
            wwwBaseUrl={this.props.wwwBaseUrl}
            profileName={profileName}
            actionDate={actionDate}
          />
        )}
        {!inValidProfile && (
          <s.noCssDiv>
            <s.inboxItems>
              <ProfilePhotoList
                imgTitle={imageTitleConditionFn(contactInfo)}
                type={'contactSummaryCard'}
                flags={profileData && profileData.flags}
                photos={[profileThumbnailBlur]}
                tooltip={this.props.tooltip}
                loading={this.props.loading}
                albumUrl={this.props.albumUrl}
                settings={this.props.settings}
                isTooltipVisible={this.props.isTooltipVisible}
                onTooltipClose={this.props.onTooltipClose}
                onRequestPhoto={this.onRequestPhoto}
                onShowWatermarkInfo={this.onShowWatermarkInfo}
                onRequestPassword={this.onRequestPassword}
                wwwBaseUrl={this.props.wwwBaseUrl}
                uid={profileUid}
              />
              <s.ItemProfileDetails id={profileUid}>
                <s.itemTitle>
                  <ProfileTitle
                    isSettingsPaidUser={isSettingsPaidUser}
                    isSms={isSms}
                    contactDetailsStatus={contactDetailsStatus}
                    profileUrl={profileUrl}
                    profileName={profileName}
                  />
                  {profileMembershipLevel !== 'Free' && <s.premiumTag />}
                </s.itemTitle>
                <s.profileShortInfo title={profileDetails}>{profileDetails}</s.profileShortInfo>
                <s.actionDesc />
                <ViewSms
                  contactDetailsTitleStatus={contactDetailsTitleStatus}
                  contactDetailsStatus={contactDetailsStatus}
                  profileContactStatus={profileContactStatus}
                  isProfileHidden={isProfileHidden}
                  profileData={profileData}
                  contactInfo={contactInfo}
                  wwwBaseUrl={this.props.wwwBaseUrl}
                  isSms={isSms}
                  onVeiwMsgClick={this.onVeiwMsgClick}
                  viewSmsShowStatus={this.props.viewSmsShowStatus}
                  profileUid={profileUid}
                />
              </s.ItemProfileDetails>

              <s.unifiedProfileActivity>
                {profileData && profileData.contactSummary && profileData.contactSummary.actionDate}
              </s.unifiedProfileActivity>
            </s.inboxItems>
            <s.ShowReportBlock onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
              {!['sameGender', 'blocked', 'hidden', 'theyDeclined', 'theyCancelled'].includes(contactDetailsStatus) && (
                <ReportBlockContact
                  isBlockDisplay={this.state.isBlockDisplay}
                  isMisuseDisplay={this.state.isMisuseDisplay}
                  isHelpDisplay={this.state.isHelpDisplay}
                  profileData={profileData}
                  wwwBaseUrl={this.props.wwwBaseUrl}
                  isHovered={this.state.isHovered}
                  himHer={profileData.himHer}
                  slug={profileData.slug}
                />
              )}
            </s.ShowReportBlock>
          </s.noCssDiv>
        )}
      </s.inboxcontainer>
    );
  }
}
ContactSummaryItem.defaultProps = {
  tooltip: {},
};

ContactSummaryItem.propTypes = {
  profileData: PropTypes.shape(PropTypes.contactSummaryProfile).isRequired,
  doProfileAction: PropTypes.func.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  albumUrl: PropTypes.string.isRequired,
  isTooltipVisible: PropTypes.bool.isRequired,
  tooltip: PropTypes.shape(PropTypes.alert).isRequired,
  onTooltipClose: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  viewSmsShowStatus: PropTypes.bool.isRequired,
  settings: PropTypes.shape(PropTypes.settings).isRequired,
};

export default ContactSummaryItem;
