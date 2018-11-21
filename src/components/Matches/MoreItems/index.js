import React from 'react';
import PropTypes from '../../../PropTypes';
import './styles.css';

const MoreItems = props => (
  <div className="moreItems" style={{ ...props.styles }}>
    <a className="link" target="_blank" href={props.redirectionLink}>
      <span className="linkText" />
    </a>
    <div className="NavLink">
      <a className="link" id="seeAllLink" target="_blank" href={props.redirectionLink}>
        See All
      </a>
    </div>
  </div>
);
MoreItems.defaultProps = {
  redirectionLink: '',
  styles: {},
};
MoreItems.propTypes = {
  styles: PropTypes.shape({}),
  redirectionLink: PropTypes.string,
};
export default MoreItems;
