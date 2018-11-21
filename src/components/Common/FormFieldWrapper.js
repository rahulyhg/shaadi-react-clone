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
  animation: ${heightAnimation} 2s linear;
`;

const DefaultErrorField = styled.div`
  display: block;
  color: #e53a41;
  text-align: left;
  margin: 4px 0 0;
  font: 300 13px 'Roboto', sans-serif;
`;

const FormFieldWrapper = ({ ErrorField, ShowHideWrap, isVisible, canShowError, getErrorMsg, children, ...props }) => {
  const canShow = isFunction(isVisible) ? isVisible() : isVisible;
  return (
    canShow && (
      <ShowHideWrap>
        {children}
        {canShowError && <ErrorField>{getErrorMsg}</ErrorField>}
      </ShowHideWrap>
    )
  );
};

FormFieldWrapper.defaultProps = {
  isVisible: true,
  canShowError: false,
  errorField: '',
  getErrorMsg: 'Oops! You seem to have missed this',
  ErrorField: DefaultErrorField,
  ShowHideWrap: DefaultShowHideWrap,
};

FormFieldWrapper.propTypes = {
  canShowError: PropTypes.bool,
  getErrorMsg: PropTypes.string,
  isVisible: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.element]).isRequired,
  ErrorField: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.element]).isRequired,
  ShowHideWrap: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.element]).isRequired,
};

export default FormFieldWrapper;
