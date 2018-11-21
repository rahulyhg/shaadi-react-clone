import PropTypes from 'prop-types';
import React from 'react';
import MopContext from './MopContext';

class TabList extends React.PureComponent {
  render() {
    return (
      <MopContext.Consumer>
        {({ activeIndex, onActivate }) => {
          const children = React.Children.map(this.props.children, (child, index) =>
            React.cloneElement(child, {
              activeIndex,
              isActive: index === activeIndex,
              onClick: () => onActivate(index),
            }),
          );
          const style = this.props.getListStyle();
          return <div style={style}>{children}</div>;
        }}
      </MopContext.Consumer>
    );
  }
}
TabList.defaultProps = {
  getListStyle: () => null,
};
TabList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  getListStyle: PropTypes.func,
};
export default TabList;
