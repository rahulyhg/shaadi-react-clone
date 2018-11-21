import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Link = props => {
  if (!props.to) {
    return <span className={props.className}>{props.children}</span>;
  }
  if (props.isExternal) {
    return (
      <a
        className={props.className}
        target={props.target}
        href={`${props.to}`.indexOf('http') === 0 ? props.to : `${props.host}${props.to}`}
      >
        {props.children}
      </a>
    );
  }
  return (
    <RouterLink className={props.className} to={props.to}>
      {props.children}
    </RouterLink>
  );
};

Link.defaultProps = {
  to: undefined,
  children: undefined,
  isExternal: true,
  target: '_blank',
  className: '',
  host: 'http://test.server/',
};

Link.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
  host: PropTypes.string.isRequired,
  isExternal: PropTypes.bool,
  target: PropTypes.string,
  className: PropTypes.string,
};

export default props => <Link {...props} />;
