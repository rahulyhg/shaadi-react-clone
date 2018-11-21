import React from 'react';
import PropTypes from 'prop-types';
import './theme.css';

const config = {
  imagePath: '/assets/',
  left: '<',
  right: '>',
};
const CarousalNav = props => (
  <button className={`${props.className} ${props.theme} arrow_${props.direction} `} style={{ ...props.style }} onClick={props.onClick}>
    {props.arrowType === 'image' ? (
      <img alt="nav" src={`${config.imagePath}${props.arrowName}-${props.direction}.png`} />
    ) : (
      config[props.direction]
    )}
  </button>
);

CarousalNav.defaultProps = {
  theme: 'default',
  direction: 'right',
  className: '',
  style: {},
  arrowType: 'default',
  arrowName: 'nav',
};
CarousalNav.propTypes = {
  theme: PropTypes.string,
  className: PropTypes.string,
  direction: PropTypes.oneOf(['left', 'right']),
  style: PropTypes.shape({}),
  onClick: PropTypes.func.isRequired,
  arrowType: PropTypes.oneOf(['image', 'default']),
  arrowName: PropTypes.string,
};
export default CarousalNav;
