import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const withProfileDataHelper = ComposedComponent => {
  class withProfileDataHelperComponent extends PureComponent {
    render = () => (
      <ComposedComponent
        {...this.props}
        uid={this.props.memberlogin}
        photoUrl={this.props.image_path}
        motherTongue={this.props.mother_tongue}
        city={this.props.nearest_city}
      />
    );
  }
  withProfileDataHelperComponent.propTypes = {
    memberlogin: PropTypes.string.isRequired,
    image_path: PropTypes.string.isRequired,
    mother_tongue: PropTypes.string.isRequired,
    nearest_city: PropTypes.string.isRequired,
  };
  return withProfileDataHelperComponent;
};

export default withProfileDataHelper;
