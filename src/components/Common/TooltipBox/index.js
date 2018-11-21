import React from 'react';
import PropTypes from '../../../PropTypes';
import s from './styles';

const TooltipBox = props => (
  <s.TooltipBtmWrap
    onMouseOver={props.onMouseOver}
    onMouseOut={props.onMouseOut}
    top={props.top}
    right={props.right}
    afterTop={props.afterTop}
    afterRight={props.afterRight}
    rotate={props.rotate}
    innerRef={props.innerRef}
  >
    {props.children}
  </s.TooltipBtmWrap>
);

TooltipBox.defaultProps = {
  onMouseOver() {},
  onMouseOut() {},
  innerRef() {},
  top: '35px',
  right: '-1px',
  afterTop: '-10px',
  afterRight: '7px',
  rotate: '(-0deg)',
};

TooltipBox.propTypes = {
  onMouseOver: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
  innerRef: PropTypes.func.isRequired,
  top: PropTypes.string.isRequired,
  right: PropTypes.string.isRequired,
  afterTop: PropTypes.string.isRequired,
  afterRight: PropTypes.string.isRequired,
  rotate: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default TooltipBox;
