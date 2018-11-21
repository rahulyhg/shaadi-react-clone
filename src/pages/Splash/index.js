import React from 'react';
import { connect } from 'react-redux';
import PropTypes from '../../PropTypes';
import Desktop from './desktop';
import Mobile from './mobile';

const Splash = ({ layout }) => (layout === 'desktop' ? <Desktop /> : <Mobile />);

Splash.propTypes = {
  layout: PropTypes.string.isRequired,
};

const selector = state => ({
  layout: state.view.layout,
});

export default connect(selector, {})(Splash);
