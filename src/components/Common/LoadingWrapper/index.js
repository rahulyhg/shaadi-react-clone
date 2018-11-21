import React from 'react';
import s from './styles';
import PropTypes from '../../../PropTypes';

const LoadingWrapper = props => (
  <s.LoadingWrapper isVisible={props.isVisible}>
    <s.ColorBg />
    <s.LoadingIndicator>
      <s.LoadingIcon />
      <s.LoadingText>Loading...</s.LoadingText>
    </s.LoadingIndicator>
  </s.LoadingWrapper>
);
LoadingWrapper.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};
export default LoadingWrapper;
