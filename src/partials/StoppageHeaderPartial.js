import React from 'react';
import { connect } from 'react-redux';
import PropTypes from '../PropTypes';
import StoppageHeader from '../components/Header/StoppageHeader';

const StoppageHeaderPartial = props => <StoppageHeader {...props} />;

StoppageHeaderPartial.mapStateToProps = ({
  session: { nextUrl, isNative, canShowSkip, user },
  view: { layout },
  header: { thumbnail, inverseLogo: logo },
}) => ({
  layout,
  thumbnail,
  canShowSkip,
  logo,
  nextUrl,
  isNative,
  multiLang: { slang: user.slang, litem: user.litem },
});

StoppageHeaderPartial.propTypes = {
  layout: PropTypes.string.isRequired,
  nextUrl: PropTypes.string.isRequired,
  isNative: PropTypes.bool.isRequired,
  thumbnail: PropTypes.shape({ img: PropTypes.shape(PropTypes.image) }).isRequired,
  logo: PropTypes.shape({
    img: PropTypes.shape(PropTypes.image).isRequired,
    url: PropTypes.string,
    isExternal: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connect(StoppageHeaderPartial.mapStateToProps, {})(StoppageHeaderPartial);
