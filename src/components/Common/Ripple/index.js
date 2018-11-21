import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Relative from '../../../theme/Relative';
import RippleElement from '../../../theme/Ripple';

class Ripple extends PureComponent {
  state = {
    canShowRipple: false,
    left: 0,
    top: 0,
    scale: 0,
  };
  componentWillUnmount = () => this.timeOut && clearTimeout(this.timeOut);
  onMouseDown = event => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.pageX - bounds.left;
    const y = event.pageY - bounds.top;
    const { width: scale } = bounds;
    const left = `${x}px`;
    const top = `${y}px`;
    this.setState({ canShowRipple: true, left, top, scale });
    if (this.timeout) clearTimeout(this.timeout);
    this.timeOut = setTimeout(this.rippleTimedOut, 500);
  };
  rippleTimedOut = () => this.setState({ canShowRipple: false });
  render = () => (
    <Relative onMouseDown={this.onMouseDown} overflow="hidden">
      {this.props.children}
      {this.state.canShowRipple && <RippleElement color={this.props.color} {...this.state} />}
    </Relative>
  );
}

Ripple.propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Ripple;
