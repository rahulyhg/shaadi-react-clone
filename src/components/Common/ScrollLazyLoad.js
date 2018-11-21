import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// @todo WIP: make this for on scroll and as per current array index, moving up or down, accordingly show options. Auto Show: itmes to show as per view port height

class ScrollLazyLoad extends PureComponent {
  state = {
    lastIndexShown: 0,
  };
  componentDidMount = () => {
    window.addEventListener('touchmove', this.onScroll, false);
    window.addEventListener('scroll', this.onScroll, false);
  };
  componentWillUnmount = () => this.removeEventListner();
  onScroll = event => {
    if (this.getNewIndex() > React.Children.count(this.props.children)) {
      this.removeEventListner();
    }
    this.setState({ lastIndexShown: this.getNewIndex() });
  };
  getNewIndex = () => this.state.lastIndexShown + this.props.itemsLimit;
  removeEventListner = () => {
    window.removeEventListener('touchmove', this.onScroll);
    window.removeEventListener('scroll', this.onScroll);
  };
  renderChild = (child, index) => index < this.state.lastIndexShown + this.props.itemsLimit && child;
  render = () => React.Children.map(this.props.children, this.renderChild);
}

ScrollLazyLoad.defaultProps = {
  itemsLimit: 20,
  children: [],
};

ScrollLazyLoad.propTypes = {
  itemsLimit: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.node),
};

export default ScrollLazyLoad;
