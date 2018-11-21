import PropTypes from 'prop-types';
import React from 'react';

class TabPanel extends React.PureComponent {
  render() {
    return this.props.children;
  }
}
TabPanel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
};
export default TabPanel;
