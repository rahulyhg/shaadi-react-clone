import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';
import { encode64 } from '../../../utils';
import ConfettiAnimation from '../../../components/Common/Animations/Confetti';

const renderSent = name => (
  <React.Fragment>
    You have accepted <s.NameBg title={name}>{name}</s.NameBg>&#39;s Invitation
  </React.Fragment>
);

const renderRecieved = name => (
  <React.Fragment>
    <s.NameBg title={name}>{name}</s.NameBg> has accepted your Invitation
  </React.Fragment>
);

const typeFuncMap = {
  sent: renderSent,
  received: renderRecieved,
};

const AcceptMatch = props => {
  const lapsedMember = props.settings.wasPaidUser && !props.settings.isPaidUser;
  return (
    <s.LayerWrap>
      <s.CloseIcon onClick={() => props.doModalAction('modal/accept_match', props.uid, 'close')} title="Close" />
      <s.MonetizationWrap>
        <s.LayerLink to={`/profile?profileid=${props.uid}&evt_ref=${encode64('Accept_Success')}`} target={'_blank'}>
          <ConfettiAnimation />
          <s.TopSectionWrap>
            <s.LayerTitle type={props.type} title="It's an Accept!" />
            <s.TopMsg>{typeFuncMap[props.type] && typeFuncMap[props.type](props.name)}</s.TopMsg>
            <s.PhotoWrap>
              <s.ProfilePhoto profilePhoto={props.profilePhoto} />
            </s.PhotoWrap>
            <s.ProfileName>{props.name}</s.ProfileName>
          </s.TopSectionWrap>
        </s.LayerLink>
        <s.LayerLink isExternal to={`/payment?source=Accept_Success`} target={'_self'}>
          <s.BtmSection>
            <s.BtmMsg>
              Take the next step now
              <s.UpgradeCopy>
                {lapsedMember ? 'Renew now' : 'Upgrade'} to message or call {props.himHer.toLowerCase()} directly
              </s.UpgradeCopy>
            </s.BtmMsg>
            <s.ActionBtnWrap>
              {lapsedMember ? (
                <s.premiumBannerGoldenBtn>
                  <s.ButtonCrown />
                  Renew Premium
                </s.premiumBannerGoldenBtn>
              ) : (
                <s.ContactLink title="View Premium Plans">View Premium Plans</s.ContactLink>
              )}
            </s.ActionBtnWrap>
          </s.BtmSection>
        </s.LayerLink>
      </s.MonetizationWrap>
    </s.LayerWrap>
  );
};

AcceptMatch.defaultProps = {
  name: '',
  himHer: '',
  uid: null,
  profilePhoto: null,
  type: null,
};

AcceptMatch.propTypes = {
  doModalAction: PropTypes.func.isRequired,
  name: PropTypes.string,
  himHer: PropTypes.string,
  uid: PropTypes.string,
  profilePhoto: PropTypes.string,
  type: PropTypes.string,
  settings: PropTypes.shape(PropTypes.settings).isRequired,
};

export default AcceptMatch;
