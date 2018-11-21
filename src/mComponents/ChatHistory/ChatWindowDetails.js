import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from '../../PropTypes';
import { ChatWindowProDetails, ChatInviteAction, ChatErrorMsgWrap, Clearfix } from './styles';
import EoiMobile from '../../mComponents/EoiMobile/EoiMobileChat';

const extract = (list, key) => ((list.find(h => h.key === key) || {}).value || '').replace(',', key === 'age-height' ? ' yrs,' : ',');
const extractByLabel = (list, label) => (list.find(h => h.label === label) || {}).value || '';

class ChatWindowDetails extends React.Component { //eslint-disable-line
  render() {
    const { profile, settings, onAction } = this.props;
    const isPaidDefault =
      profile.gender !== settings.gender &&
      settings.isPaidUser &&
      (profile.flags.connectionStatus === 'none' || ['default', 'shortlisted'].includes(profile.flags.connectionStatus));
    return (
      <div>
        <ChatWindowProDetails>
          <div>
            {extract(profile.base.detailList, 'age-height')}, {extractByLabel(profile.base.infoMap, 'Mother Tounge')},{' '}
            {extract(profile.summary.infoMap, 'community')},
          </div>
          <div>
            {extract(profile.summary.infoMap, 'profession')}, {extract(profile.base.detailList, 'location')}
          </div>
        </ChatWindowProDetails>
        <ChatInviteAction>
          {isPaidDefault ? (
            <Typography variant="body2" style={{ fontWeight: 'bold' }}>
              An Invitation to Connect will be sent along with your Chat.
            </Typography>
          ) : (
            <EoiMobile connectionStatus={profile.flags.connectionStatus} onAction={onAction} />
          )}
        </ChatInviteAction>
        <Clearfix />
        <ChatErrorMsgWrap />
      </div>
    );
  }
}

ChatWindowDetails.propTypes = {
  profile: PropTypes.shape(PropTypes.basicProfile).isRequired,
  settings: PropTypes.shape(PropTypes.settings).isRequired,
  onAction: PropTypes.func.isRequired,
};

export default ChatWindowDetails;
