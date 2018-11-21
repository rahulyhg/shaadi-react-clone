import React from 'react';
import PropTypes from '../../../PropTypes';
import s from './style';

class OverLay extends React.PureComponent {
  render() {
    return (
      <s.OverlayDiv onHover={this.props.onHover} zIndex={this.props.zIndex}>
        {this.props.children}
      </s.OverlayDiv>
    );
  }
}

OverLay.defaultProps = {
  onHover: false,
  zIndex: 4,
};

OverLay.propTypes = {
  onHover: PropTypes.bool,
  zIndex: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default OverLay;
