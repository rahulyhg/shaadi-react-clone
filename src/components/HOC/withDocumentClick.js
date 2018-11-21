import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const withDocumentClick = ComposedComponent => {
  class withDocumentClickComponent extends PureComponent {
    componentDidMount() {
      document.addEventListener('click', this.props.onDocumentClick);
    }
    componentWillUnmount() {
      document.removeEventListener('click', this.props.onDocumentClick);
    }
    render = () => <ComposedComponent {...this.props} />;
  }
  withDocumentClickComponent.propTypes = {
    onDocumentClick: PropTypes.func.isRequired,
  };
  return withDocumentClickComponent;
};

export default withDocumentClick;
