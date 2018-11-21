import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';

const FirstStep = props => (
  <s.FistStepWrapper>
    <s.ClapImg />
    {['connect', 'bulkConnect'].includes(props.data.connectionType) && <s.FirstStepTitle>Well Done!</s.FirstStepTitle>}
    {['accept'].includes(props.data.connectionType) && <s.FirstStepTitle>Congratulations!</s.FirstStepTitle>}
    <s.Caption>
      {['connect', 'bulkConnect'].includes(props.data.connectionType) &&
        `You've taken the first step by connecting with ${props.data.name}`}
      {['accept'].includes(props.data.connectionType) && `You Accepted ${props.data.name}'s Invitation.`}
    </s.Caption>
    <s.WhyWait>Why wait?</s.WhyWait>
    <s.UpgradeText>Upgrade and message or call {props.data.himHer.toLowerCase()} now.</s.UpgradeText>
    {['connect', 'bulkConnect'].includes(props.data.connectionType) && (
      <s.LayerUpgradeLink onClick={() => paymentPageRedirect(props, '/payment?source=profile_intsent_contextual')}>
        View Premium Plans
      </s.LayerUpgradeLink>
    )}
    {['accept'].includes(props.data.connectionType) && (
      <s.LayerUpgradeLink onClick={() => paymentPageRedirect(props, '/payment?source=profile_accsent_contextual')}>
        View Premium Plans
      </s.LayerUpgradeLink>
    )}
    <s.Discount>{props.data.msg}</s.Discount>
    {props.data.source === 'profile' && <s.NextProfileLink onClick={() => nextProfileLink(props)}>View Next Profile</s.NextProfileLink>}
  </s.FistStepWrapper>
);

const nextProfileLink = props => {
  props.onModalClose();
  if (props.data.nextProfileLink) {
    setTimeout(() => {
      window.location.href = `${props.data.nextProfileLink}`;
    }, 2000);
  }
  return false;
};

const paymentPageRedirect = (props, to) => {
  props.onModalClose();
  if (to) {
    setTimeout(() => {
      window.location.href = `${props.wwwBaseUrl}/${to}`;
    }, 2000);
  }
  return false;
};

FirstStep.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    himHer: PropTypes.oneOf(['Him', 'Her']).isRequired,
    nextProfileLink: PropTypes.string,
    source: PropTypes.string.isRequired,
    connectionType: PropTypes.string.isRequired,
    discount: PropTypes.number.isRequired,
    msg: PropTypes.string,
  }).isRequired,
};

export default FirstStep;
