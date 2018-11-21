import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';

const SubNav = props => {
  const { onNavClick } = props;
  return (
    <s.InboxTabWrap>
      {props.navList.map(tabitem => (
        <s.TabItem key={tabitem} isActive={props.activeNav === tabitem} onClick={() => props.activeNav !== tabitem && onNavClick(tabitem)}>
          {props.listParams[tabitem]} {!!props.counts[tabitem] && `(${props.counts[`${tabitem}_new`] || props.counts[tabitem]})`}
        </s.TabItem>
      ))}
    </s.InboxTabWrap>
  );
};

SubNav.defaultProps = {
  counts: {},
};
SubNav.propTypes = {
  navList: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeNav: PropTypes.string.isRequired,
  onNavClick: PropTypes.func.isRequired,
  counts: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  listParams: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default SubNav;
