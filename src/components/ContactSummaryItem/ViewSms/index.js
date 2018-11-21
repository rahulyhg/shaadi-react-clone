import React from 'react';
import PropTypes from '../../../PropTypes';
import s from './styles';
import { phoneIcon, contactDetailStatusInfoFn, getBackgroundColorConditionFn } from '../utils';

const ViewSms = props => {
  const {
    contactDetailsTitleStatus,
    contactDetailsStatus,
    profileContactStatus,
    isProfileHidden,
    isSms,
    onVeiwMsgClick,
    viewSmsShowStatus,
    profileUid,
    profileData,
    wwwBaseUrl,
  } = props;

  const contactInfo = profileData && profileData.contactSummary ? profileData.contactSummary : false;
  const contactDetailStatusInfoValue = profileData && contactDetailStatusInfoFn(profileData, contactInfo, wwwBaseUrl);
  const bgCondition = getBackgroundColorConditionFn(contactDetailsStatus, profileContactStatus);
  return (
    <s.viewSmsMsg>
      <s.contact>
        {phoneIcon(contactDetailsTitleStatus, contactDetailsStatus, profileContactStatus, isProfileHidden)}
        {bgCondition && contactDetailStatusInfoValue}
      </s.contact>
      {!bgCondition && <s.viewSmsGrayBg>{contactDetailStatusInfoValue}</s.viewSmsGrayBg>}
      {isSms && (
        <s.viewMsgDiv>
          <s.viewSms
            id="msgId"
            onClick={() => {
              onVeiwMsgClick(profileUid);
            }}
          >
            View SMS
          </s.viewSms>
          <s.hideNumberDownArrow
            id="hideIcon"
            onClick={() => {
              onVeiwMsgClick(profileUid);
            }}
            isVeiwMsgClick={!viewSmsShowStatus}
          />
          <s.hideNumberUpArrow
            id="showIcon"
            onClick={() => {
              onVeiwMsgClick(profileUid);
            }}
            isVeiwMsgClick={viewSmsShowStatus}
          />
        </s.viewMsgDiv>
      )}

      {(isSms && (
        <s.viewSmsGrayBox id="viewSms" isVeiwMsgClick={viewSmsShowStatus}>
          {viewSmsShowStatus && isSms}
        </s.viewSmsGrayBox>
      )) || <s.viewSmsGrayBox />}
    </s.viewSmsMsg>
  );
};

ViewSms.propTypes = {
  contactDetailsTitleStatus: PropTypes.contactDetailsTitleStatus.isRequired,
  contactDetailsStatus: PropTypes.contactDetailStatus.isRequired,
  profileContactStatus: PropTypes.connectContactStatus.isRequired,
  isProfileHidden: PropTypes.string.isRequired,
  isSms: PropTypes.string.isRequired,
  onVeiwMsgClick: PropTypes.func.isRequired,
  viewSmsShowStatus: PropTypes.bool.isRequired,
  profileUid: PropTypes.string.isRequired,
  profileData: PropTypes.shape(PropTypes.contactSummaryProfile).isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
};

export default ViewSms;
