import React from 'react';
import AsyncComponent from '../../components/AsyncComponent';

const Desktop = AsyncComponent(() => import(/* webpackChunkName: "StoppageFooterPartial.desktop" */ './desktop'));
const StoppageFooterPartial = () => <Desktop />;
export default StoppageFooterPartial;
