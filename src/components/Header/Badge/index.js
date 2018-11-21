import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';

const Badge = props => {
  if (props.isVisible) {
    return (
      <s.Badge isVisible={props.isVisible}>
        <s.BadgeRibbon />
        <s.BadgeLink to={props.url} isExternal={props.isExternal} target="_blank" title={props.img.title} rel="noopener noreferrer">
          <s.BadgeImg {...props.img} />
        </s.BadgeLink>
      </s.Badge>
    );
  }
  return null;
};

Badge.defaultProps = {
  isVisible: false,
  url: null,
};

const imgPropTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
};

Badge.propTypes = {
  img: PropTypes.shape(imgPropTypes).isRequired,
  url: PropTypes.string,
  isExternal: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool,
};

export default Badge;
