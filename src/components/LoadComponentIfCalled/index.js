import React from 'react';

export default function asyncComponent(getComponent, LoadingComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }
    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return LoadingComponent ? <LoadingComponent /> : null;
    }
  };
}

// getComponent is a function that returns a promise for a component
// It will not be called until the first mount
// ref: https://gist.github.com/acdlite/a68433004f9d6b4cbc83b5cc3990c194
// ref: https://stackoverflow.com/questions/36929000/conditional-import-or-alternative-in-javascript-reactjs-webapp
