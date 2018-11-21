import PropTypes from 'prop-types';
import React from 'react';

import MopContext from './MopContext';

class Tabs extends React.Component {
  state = {
    activeIndex: 0,
  };

  render() {
    return (
      <MopContext.Provider
        value={{
          activeIndex: this.state.activeIndex,
          onActivate: index => this.setState({ activeIndex: index }),
        }}
      >
        {this.props.children}
      </MopContext.Provider>
    );
  }
}

Tabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
export default Tabs;
