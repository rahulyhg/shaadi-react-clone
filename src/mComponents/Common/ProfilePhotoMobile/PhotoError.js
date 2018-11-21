import React from 'react';
import PropTypes from 'prop-types';

const PhotoError = ({ height, retry, ...props }) => (
  <div
    style={{
      width: '100%',
      height: `${height}px`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: 'red',
      opacity: '0.8',
    }}
    {...props}
  >
    <div style={{ fontSize: '1.5em' }}>{'⚠'}</div>
    <div>Unable to load image</div>
    {retry ? <button onClick={retry}>Retry</button> : null}
  </div>
);

PhotoError.defaultProps = {
  retry: null,
};

PhotoError.propTypes = {
  height: PropTypes.number.isRequired,
  retry: PropTypes.func,
};

export default PhotoError;
