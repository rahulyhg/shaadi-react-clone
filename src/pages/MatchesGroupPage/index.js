import React from 'react';
import { connect } from 'react-redux';
import PropTypes from '../../PropTypes';
import AsyncComponent from '../../components/AsyncComponent';
import Spinner from '../../components/Spinner';

const Desktop = AsyncComponent(() => import(/* webpackChunkName: "MatchesGroupPage.desktop" */ './desktop'), Spinner);
const Mobile = AsyncComponent(() => import(/* webpackChunkName: "MatchesGroupPage.mobile" */ './mobile'));

const MatchesGroupPage = ({ windowWidth, grpType }) => (windowWidth > 720 ? <Desktop grpType={grpType} /> : <Mobile grpType={grpType} />);

MatchesGroupPage.propTypes = {
  grpType: PropTypes.string.isRequired,
  windowWidth: PropTypes.number.isRequired,
};

const selector = state => ({
  windowWidth: state.view.width,
});

export default connect(selector, {})(MatchesGroupPage);
