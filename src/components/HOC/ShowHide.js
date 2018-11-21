import React from 'react';
import isFunction from 'lodash/isFunction';
import styled, { keyframes } from 'styled-components';
import PropTypes from '../../PropTypes';

const heightAnimation = keyframes`
  from {
    max-height: 0;
    overflow: hidden;
  }
  to {
    max-height: 10000px;
  }
`;

const DefaultShowHideWrap = styled.div`
  animation: ${heightAnimation} 1s ease-in-out;
`;

const ShowHide = ComposedComponent => {
  const ShowHideComponent = ({ ShowHideWrap, isVisible, wrapRef, forwardedRef, ...props }) =>
    (isFunction(isVisible) ? isVisible() : isVisible) && (
      <ShowHideWrap {...props} ref={forwardedRef} innerRef={wrapRef}>
        <ComposedComponent {...props} />
      </ShowHideWrap>
    );

  ShowHideComponent.defaultProps = {
    isVisible: true,
    ShowHideWrap: DefaultShowHideWrap,
  };

  ShowHideComponent.propTypes = {
    isVisible: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    ShowHideWrap: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.element]).isRequired,
  };

  return ShowHideComponent;
};

export default ShowHide;
