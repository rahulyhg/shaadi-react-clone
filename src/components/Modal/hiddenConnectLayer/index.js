import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';
import ss from '../styles';

const HiddenConnectLayer = props => (
  <s.HiddenConnectLayer>
    <ss.Header>
      <ss.Title>Get in touch with</ss.Title>
      <ss.CloseModalBtn onClick={props.onModalClose} />
    </ss.Header>
    <s.HiddenLayerContent>
      Your profile is currently hidden, To connect with this member, please make your Profile
      <s.ActiveHiddenProfile isExternal to={`/my-shaadi/profile/unhide`}>
        {` Visible`}
      </s.ActiveHiddenProfile>
    </s.HiddenLayerContent>
  </s.HiddenConnectLayer>
);

HiddenConnectLayer.propTypes = {
  onModalClose: PropTypes.func.isRequired,
};

export default HiddenConnectLayer;
