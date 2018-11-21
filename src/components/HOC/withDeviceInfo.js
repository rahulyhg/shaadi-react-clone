import React from 'react';
import { connect } from 'react-redux';
import PropTypes from '../../PropTypes';

const isMobile = layout => () => layout === 'mobile';

export default ComposedComponent => {
  const withDeviceInfoComponent = props => (
    <ComposedComponent isMobile={isMobile(props.deviceInfo.layout)} windowHeight={props.deviceInfo.height} {...props} />
  );
  withDeviceInfoComponent.propTypes = {
    deviceInfo: PropTypes.shape({ height: PropTypes.number, layout: PropTypes.string }).isRequired,
  };
  const mapStoreToProps = store => ({ deviceInfo: store.view });
  return connect(mapStoreToProps)(withDeviceInfoComponent);
};
