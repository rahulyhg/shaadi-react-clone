import React from 'react';
import PropTypes from '../../../../PropTypes';
import s from '../styles';

const miniEmail = (wwwBaseUrl, uid, isPaidUser, onSendEmailClick, type) =>
  (isPaidUser && <s.ContactSpan onClick={onSendEmailClick}>Send Email</s.ContactSpan>) || (
    <s.ContactLink to={`${wwwBaseUrl}/payment?source=profile_sendemail&profileid=${uid}&profile_type=${type}`} target="_blank" isExternal>
      Send Email
    </s.ContactLink>
  );

const miniSms = (wwwBaseUrl, uid, isPaidUser, onViewPhoneNoClick, type) =>
  (isPaidUser && <s.ContactSpan onClick={onViewPhoneNoClick}>Call / Send SMS</s.ContactSpan>) || (
    <s.ContactLink to={`${wwwBaseUrl}/payment?source=profile_callsendSMS&profileid=${uid}&profile_type=${type}`} target="_blank" isExternal>
      Call / Send SMS
    </s.ContactLink>
  );

const DailyRecommendations = props => {
  const justNow = props.justNow ? props.justNow : !props.drAction || props.drAction === '';
  const { isPaidUser = false } = props.settings;
  const type = props.status === 'contacted' ? 'member_contacted' : 'member_filtered_contacted';
  switch (props.status) {
    case 'contacted':
    case 'filteredContacted':
      return (
        <s.ContactedWrap status="contacted">
          <s.ContactedMsg>
            Invitation sent to&nbsp;
            <s.ProfileName>{`${props.name}`}</s.ProfileName>
            {!justNow && (
              <s.GotoLinkWrap>
                (Go to{' '}
                <s.ContactLink to={`${props.wwwBaseUrl}/inbox/sent`} target="_blank" isExternal>
                  Sent items
                </s.ContactLink>)
              </s.GotoLinkWrap>
            )}
          </s.ContactedMsg>
          <s.ReVisitWrap>
            {!justNow && <s.SubHeading>{`Want to contact ${props.himHer.toLowerCase()} right away?`}&nbsp;</s.SubHeading>}
            {miniEmail(props.wwwBaseUrl, props.uid, isPaidUser, props.onSendEmailClick, type)}|
            {miniSms(props.wwwBaseUrl, props.uid, isPaidUser, props.onViewPhoneNoClick, type)}
            {justNow && <s.ContactLinkBG to={props.nextUrl}>| Next recommendation</s.ContactLinkBG>}
          </s.ReVisitWrap>
        </s.ContactedWrap>
      );
    default:
  }
  return null;
};

DailyRecommendations.defaultProps = {
  justNow: false,
  drAction: '',
  onSendEmailClick: null,
  onViewPhoneNoClick: null,
};

DailyRecommendations.propTypes = {
  status: PropTypes.connectionStatus.isRequired,
  name: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  onSendEmailClick: PropTypes.func,
  onViewPhoneNoClick: PropTypes.func,
  settings: PropTypes.shape({
    isPaidUser: PropTypes.bool,
  }).isRequired,
  nextUrl: PropTypes.string.isRequired,
  justNow: PropTypes.bool.isRequired,
  himHer: PropTypes.oneOf(['Him', 'Her']).isRequired,
  drAction: PropTypes.string,
};

export default DailyRecommendations;
