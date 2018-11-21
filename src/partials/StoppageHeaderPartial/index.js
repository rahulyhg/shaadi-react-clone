import React from 'react';
import { connect } from 'react-redux';
import PropTypes from '../../PropTypes';
import AsyncComponent from '../../components/AsyncComponent';

const Responsive = AsyncComponent(() => import(/* webpackChunkName: "StoppageHeaderPartial.desktop" */ './desktop'));

const StoppageHeaderPartial = props => <Responsive {...props} />;

StoppageHeaderPartial.mapStateToProps = ({
  session: { nextUrl, isNative, canShowSkip, canShowTooltipOnStoppageHeader },
  view: { layout },
  header: { thumbnail, inverseLogo: logo },
}) => ({
  layout,
  thumbnail,
  canShowSkip,
  canShowTooltipOnStoppageHeader,
  logo,
  nextUrl,
  isNative,
});

StoppageHeaderPartial.propTypes = {
  layout: PropTypes.string.isRequired,
  nextUrl: PropTypes.string.isRequired,
  isNative: PropTypes.bool.isRequired,
  canShowTooltipOnStoppageHeader: PropTypes.bool.isRequired,
  thumbnail: PropTypes.shape({ img: PropTypes.shape(PropTypes.image) }).isRequired,
  logo: PropTypes.shape({
    img: PropTypes.shape(PropTypes.image).isRequired,
    url: PropTypes.string,
    isExternal: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connect(StoppageHeaderPartial.mapStateToProps, {})(StoppageHeaderPartial);
