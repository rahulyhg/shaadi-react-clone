import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, InnerWrapper, CtaWrapper } from './styles';

const actionTypeMap = {
  connect: 'tickAction',
  accept: 'tickAction',
  sendMessage: 'mesageAction',
  viewContact: 'contactAction',
  cancel: 'declineAction',
  decline: 'declineAction',
};

const Cta = props => (
  <CtaWrapper onClick={props.onClick}>
    <Wrapper actionType={actionTypeMap[props.actionType]} versionType={props.versionType}>
      <InnerWrapper isHovered={props.isHovered} actionType={actionTypeMap[props.actionType]} versionType={props.versionType} />
    </Wrapper>
    {props.children}
  </CtaWrapper>
);
Cta.defaultProps = {
  children: '',
  isHovered: false,
};
Cta.propTypes = {
  onClick: PropTypes.func.isRequired,
  actionType: PropTypes.oneOf(['connect', 'accept', 'sendMessage', 'viewContact', 'cancel', 'decline']).isRequired,
  versionType: PropTypes.oneOf(['red', 'green', 'grey']).isRequired,
  children: PropTypes.node,
  isHovered: PropTypes.bool,
};
export default Cta;
