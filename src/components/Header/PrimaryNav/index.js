import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';

const displayCnt = count => (count > 999 ? '999+' : count);

const PrimaryNav = props => (
  <s.PrimaryNav>
    {props.items.map((item, i) => (
      <s.PrimaryLink
        isActive={item.isActive || i === props.activeIndex}
        isBottomBarVisible={props.isBottomBarVisible}
        to={item.url}
        target="_self"
        isExternal={item.isExternal}
        key={item.key}
        onClick={() => props.onAction('acceptBanner')}
      >
        {item.label}
        <s.PrimaryLinkCount isVisible={item.count && !item.isActive && i !== props.activeIndex}>
          {item.key === 'matches' && item.topBarMatches ? displayCnt(item.topBarMatches) : displayCnt(item.count)}
        </s.PrimaryLinkCount>
      </s.PrimaryLink>
    ))}
  </s.PrimaryNav>
);

const navItemPropTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  isExternal: PropTypes.bool,
  isActive: PropTypes.bool,
  count: PropTypes.number,
};

PrimaryNav.defaultProps = {
  items: [],
  isBottomBarVisible: true,
};

PrimaryNav.propTypes = {
  isBottomBarVisible: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape(navItemPropTypes)),
  activeIndex: PropTypes.number.isRequired,
};

export default PrimaryNav;
