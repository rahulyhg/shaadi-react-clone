import React from 'react';
import AsyncComponent from '../../components/AsyncComponent';
import { Context } from '../../components/Common/Context';

const Desktop = AsyncComponent(() => import(/* webpackChunkName: "LayerPartial" */ './desktop'));

const LayerPartial = props => <Context.Consumer>{({ canShowLayerPartial }) => canShowLayerPartial && <Desktop />}</Context.Consumer>;

export default LayerPartial;
