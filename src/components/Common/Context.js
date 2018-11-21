import React from 'react';
import PropTypes from '../../PropTypes';

export const Context = React.createContext();

class ContextProvider extends React.PureComponent {
  render() {
    return <Context.Provider value={{ ...this.props }}>{this.props.children}</Context.Provider>;
  }
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
