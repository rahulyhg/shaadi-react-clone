import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from '../../PropTypes';

const CommonErrorField = styled.div`
  display: block;
  color: #e53a41;
  text-align: left;
  margin: 4px 0 0;
  font: 300 13px 'Roboto', sans-serif;
`;

const CanShowError = WrapperComponent => {
  const CanShowErrorComponent = props => {
    const ErrorField = props.errorField ? props.errorField : CommonErrorField;
    return (
      <Fragment>
        <WrapperComponent {...props} />
        {props.canShowError && <ErrorField>{props.getErrorMsg}</ErrorField>}
      </Fragment>
    );
  };

  CanShowErrorComponent.defaultProps = {
    canShowError: false,
    errorField: '',
    getErrorMsg: '',
  };

  CanShowErrorComponent.propTypes = {
    canShowError: PropTypes.bool.isRequired,
    getErrorMsg: PropTypes.string.isRequired,
    errorField: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  };

  return CanShowErrorComponent;
};

export default CanShowError;
