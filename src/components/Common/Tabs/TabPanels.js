import PropTypes from 'prop-types';
import React from 'react';

import * as s from './styles';
import MopContext from './MopContext';

class TabPanels extends React.PureComponent {
  render() {
    return (
      <MopContext.Consumer>
        {({ isActive, activeIndex }) => <div style={s.tabPanels}>{this.props.children[activeIndex]}</div>}
      </MopContext.Consumer>
    );
  }
}
TabPanels.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
export default TabPanels;
