import React from 'react';
import PropTypes from '../../PropTypes';
import StoppageHeader from '../../components/Header/StoppageHeader';

const StoppageHeaderPartial = props => <StoppageHeader {...props} />;

StoppageHeaderPartial.propTypes = {
  thumbnail: PropTypes.shape({ img: PropTypes.shape(PropTypes.image) }).isRequired,
  logo: PropTypes.shape({
    img: PropTypes.shape(PropTypes.image).isRequired,
    url: PropTypes.string,
    isExternal: PropTypes.bool.isRequired,
  }).isRequired,
  nextUrl: PropTypes.string.isRequired,
  layout: PropTypes.string.isRequired,
  canShowSkip: PropTypes.bool.isRequired,
  isNative: PropTypes.bool.isRequired,
};

export default StoppageHeaderPartial;
