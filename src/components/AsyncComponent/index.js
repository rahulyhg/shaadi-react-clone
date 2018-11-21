/* eslint react/no-did-mount-set-state: 0 */
import React from 'react';

export default function asyncComponent(importComponent, LoadingComponent) {
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null,
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component,
      });
    }

    render() {
      const C = this.state.component;

      // return LoadingComponent ? <LoadingComponent /> : null;
      return C ? <C {...this.props} /> : LoadingComponent ? <LoadingComponent /> : null;
    }
  }

  return AsyncComponent;
}
