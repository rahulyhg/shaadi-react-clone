import React from 'react';
import PropTypes from '../../../PropTypes';
import s from './styles';
import { getImageForInvalidProfile } from '../utils';

const InvalidProfileItem = props => {
  const { loggerGender, wwwBaseUrl, profileName, actionDate } = props;
  return (
    <s.inboxcontainer>
      <s.inboxItems>
        <s.profilePhoto>
          <s.Image src={getImageForInvalidProfile(loggerGender, wwwBaseUrl)} height="60" width="60" border="0" draggable="false" />
        </s.profilePhoto>
        <s.ItemProfileDetails>
          <s.itemTitle>Viewed Phone No Of {profileName}</s.itemTitle>
          <s.profileShortInfo>Details not avilable.</s.profileShortInfo>
          <s.actionDesc />
          <s.viewSmsMsg>
            <s.viewSmsGrayBg>Profile has been deactivated due to inactivity.</s.viewSmsGrayBg>
          </s.viewSmsMsg>
          <s.viewMsgDiv />
        </s.ItemProfileDetails>
        <s.unifiedProfileActivity>{actionDate}</s.unifiedProfileActivity>
      </s.inboxItems>
      <s.ShowReportBlock />
    </s.inboxcontainer>
  );
};

InvalidProfileItem.defaultProps = {
  loggerGender: '',
  wwwBaseUrl: '',
  profileName: '',
};

InvalidProfileItem.propTypes = {
  loggerGender: PropTypes.string.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  actionDate: PropTypes.string.isRequired,
};

export default InvalidProfileItem;
