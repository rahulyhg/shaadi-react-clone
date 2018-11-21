import React from 'react';
import { Context } from '../Common/Context';

export default ComposedComponent => props => (
  <Context.Consumer>{context => <ComposedComponent history={context.history} view={context.view} {...props} />}</Context.Consumer>
);
