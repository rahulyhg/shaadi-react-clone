import React from 'react';
import { connect } from 'react-redux';
import PropTypes from '../../PropTypes';
import AsyncComponent from '../../components/AsyncComponent';
import IntlComponent from '../../components/IntlComponent';
import Spinner from '../../components/Spinner';

const Desktop = AsyncComponent(() => import(/* webpackChunkName: "FourOFour.desktop" */ './desktop'), Spinner);
const Mobile = AsyncComponent(() => import(/* webpackChunkName: "FourOFour.mobile" */ './mobile'));

const Intl = IntlComponent({
  en: () => import(/* webpackChunkName: "locales.en" */ './locales/en'),
  mr: () => import(/* webpackChunkName: "locales.mr" */ './locales/mr'),
});

const NotFound = ({ layout }) => <Intl>{layout === 'desktop' ? <Desktop /> : <Mobile />}</Intl>;

NotFound.propTypes = {
  layout: PropTypes.string.isRequired,
};

const selector = state => ({
  layout: state.view.layout,
});

export default connect(selector, {})(NotFound);
