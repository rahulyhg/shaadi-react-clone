import React from 'react';
import { Context } from './Context';

const contextToFetchDefault = context => context;

export default ({ contextToFetch = contextToFetchDefault } = {}) => ComposedComponent => props => (
  <Context.Consumer>{context => <ComposedComponent {...contextToFetch(context)} {...props} />}</Context.Consumer>
);
