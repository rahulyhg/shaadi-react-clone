import React from 'react';
import PropTypes from 'prop-types';
import { TopNavItemLinkContainer, TopNavItemLink, TopNavItemButton, Icon, Count } from './styles';

const TopNavItem = props => {
  if (props.to.length) {
    return (
      <TopNavItemLinkContainer>
        <TopNavItemLink isActive={props.isActive} isExternal={props.isExternal} to={props.to} passThrough={['to', 'isExternal']}>
          <Icon isActive={props.isActive} name={props.icon} />
          <span>{props.label}</span>
          <Count isVisible={!!props.count}>{props.count}</Count>
        </TopNavItemLink>
      </TopNavItemLinkContainer>
    );
  }
  return (
    <TopNavItemLinkContainer>
      <TopNavItemButton isActive={props.isActive} onClick={props.onClick} passThrough={['onClick']}>
        <Icon isActive={props.isActive} name={props.icon} />
        <span>{props.label}</span>
        <Count isVisible={!!props.count}>{props.count}</Count>
      </TopNavItemButton>
    </TopNavItemLinkContainer>
  );
};

TopNavItem.defaultProps = {
  count: 0,
  to: '',
  onClick: () => {},
  isActive: false,
  isExternal: true,
};

TopNavItem.propTypes = {
  count: PropTypes.number,
  to: PropTypes.string,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isExternal: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

export default TopNavItem;
