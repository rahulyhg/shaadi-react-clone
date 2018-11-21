import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

const Link = props => {
  if (!props.to) {
    return <span className={props.className}>{props.children}</span>;
  }
  if (props.isExternal) {
    return (
      <a
        className={props.className}
        target={props.target || '_blank'}
        rel={props.rel || (!props.target || props.target === '_blank' ? 'noopener' : '')}
        href={`${props.to}`.indexOf('http') === 0 ? props.to : `${props.host}${props.to}`}
        title={props.title}
      >
        {props.children}
      </a>
    );
  }
  const maybeInternal =
    `${props.to}`.indexOf(`http`) !== 0 ||
    `${props.to}`.indexOf(`http://${window.location.host}`) === 0 ||
    `${props.to}`.indexOf(`https://${window.location.host}`) === 0;
  if (!maybeInternal) {
    return (
      <a className={props.className} target={props.target} rel={props.rel || 'noopener'} href={props.to} title={props.title}>
        {props.children}
      </a>
    );
  }
  return (
    <RouterLink
      className={props.className}
      target={props.target === '_blank' ? props.target : ''}
      to={props.to}
      title={props.title}
      onClick={props.onClick}
    >
      {props.children}
    </RouterLink>
  );
};

Link.defaultProps = {
  to: undefined,
  children: undefined,
  isExternal: false,
  className: '',
  title: '',
  target: '_self',
  rel: '',
  onClick: undefined,
};

Link.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
  host: PropTypes.string.isRequired,
  title: PropTypes.string,
  isExternal: PropTypes.bool,
  target: PropTypes.string,
  rel: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

const selector = state => ({ host: state.config.app.wwwBaseUrl });

export default connect(state => selector(state), {})(Link);
