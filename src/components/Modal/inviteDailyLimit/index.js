import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';
import ss from '../styles';

const encode64 = str => window.btoa(unescape(encodeURIComponent(str)));
const shortlistRef = encode64('shortlist');

const InviteDailyLimit = props => (
  <s.InviteLimitWrapper>
    <ss.Header>
      <ss.Title>Daily limit reached!</ss.Title>
      <ss.CloseModalBtn onClick={props.onModalClose} />
    </ss.Header>
    <ss.Content style={{ position: 'relative', zIndex: '3' }}>
      <s.Info>
        <s.LockIcon />
        You have reached your daily limit of 50 free invitations
      </s.Info>
      <s.UpgradeWrapper>
        <s.UpgradePara>
          To send an Invitation to&nbsp;
          <s.ProfileLink to={`/profile?profileid=${props.data.uid}`} isExternal target={'_blank'}>
            {props.data.name}
          </s.ProfileLink>,
        </s.UpgradePara>
        <s.UpgradePara>Become a Premium Member and send upto 200 Invitations in a day.</s.UpgradePara>
        <s.UpgradeLinkWrapper>
          <s.InviteUpgradeLink to={`/payment/index?loc=unified&profileid=${props.data.uid}&source=email`} isExternal target={'_blank'}>
            Upgrade Now
          </s.InviteUpgradeLink>
        </s.UpgradeLinkWrapper>
      </s.UpgradeWrapper>
      <s.Or />
      <s.Shortlist>
        Add {props.data.hisHer.toLowerCase()} to your Shortlists and visit again in 24hrs.&nbsp;
        <s.ShorlistLink to={`/profile?profileid=${props.data.uid}&atact=${shortlistRef}`} isExternal target={'_blank'}>
          Add to Shortlist
        </s.ShorlistLink>
      </s.Shortlist>
    </ss.Content>
  </s.InviteLimitWrapper>
);

InviteDailyLimit.propTypes = {
  data: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    profileUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    hisHer: PropTypes.oneOf(['His', 'Her']).isRequired,
    himHer: PropTypes.himHer,
  }).isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default InviteDailyLimit;
