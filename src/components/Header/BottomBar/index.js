import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';

const subNavDisplayData = {
  recommendations: { bucket_b: { label: "Today's Matches" } },
  'matches-preferred': { bucket_b: { label: 'My Matches' } },
};

const displayCnt = count => (count > 999 ? ' (999+)' : ` (${count})`);

const BottomBar = props => {
  const itemCountMap = {
    matches: 6,
    inbox: 6,
    default: 4,
    myShaadi: 5,
  };
  const bottomVisibleMenu = itemCountMap[props.activeTopNavItem || 'default'] || itemCountMap.default;
  let visibleNavItems = props.navItems;
  let discoverIndex;
  visibleNavItems = visibleNavItems
    .filter((obj, i) => !['broader', 'reverse', 'twoWay', 'shortlists'].includes(obj.key))
    .map((value, index) => {
      if (value.key === 'discover') {
        discoverIndex = index;
      }
      return value;
    });
  if (discoverIndex && visibleNavItems[discoverIndex + 1]) {
    const temp = visibleNavItems[discoverIndex + 1];
    visibleNavItems[discoverIndex + 1] = visibleNavItems[discoverIndex];
    visibleNavItems[discoverIndex] = temp;
  }

  const showVisibleNavItems = visibleNavItems.map((value, index) => {
    switch (value.key) {
      case 'recommendations': {
        subNavDisplayData[value.key].bucket_b.count = value.count;
        return {
          ...value,
          count: subNavDisplayData[value.key] && subNavDisplayData[value.key].bucket_b.count,
          label: (subNavDisplayData[value.key] && subNavDisplayData[value.key].bucket_b.label) || value.label,
        };
      }
      case 'matches-preferred': {
        subNavDisplayData[value.key].bucket_b.count = value.count;
        return { ...value, label: (subNavDisplayData[value.key] && subNavDisplayData[value.key].bucket_b.label) || value.label };
      }
      case 'discover': {
        return {
          ...value,
          count: subNavDisplayData['matches-preferred'] && subNavDisplayData['matches-preferred'].bucket_b.count > 0 ? 0 : value.count,
        };
      }
      default:
        return value;
    }
  });

  const hasExtraItems = visibleNavItems.length > bottomVisibleMenu;
  const navItemsInfo = showVisibleNavItems.slice(0, bottomVisibleMenu);
  const navItems = navItemsInfo.filter(
    (obj, i) =>
      props.membership.wasPaidUser === false && props.membership.accountType.toLowerCase() === 'free' && obj.key === 'callSms'
        ? false
        : !(props.membership.accountType.toLowerCase() === 'free' && obj.key === 'manageDraft'),
  );

  const extraItems = showVisibleNavItems.slice(bottomVisibleMenu, showVisibleNavItems.length);
  const validDropdown = extraItems.filter(
    (obj, i) =>
      props.membership.wasPaidUser === false && props.membership.accountType.toLowerCase() === 'free' && obj.key === 'callSms'
        ? false
        : !(props.membership.accountType.toLowerCase() === 'free' && obj.key === 'manageDraft'),
  );
  return (
    <s.BottomBarWrapper
      style={{
        top: props.isVisible ? 0 : '-41px',
      }}
      id="bottomBarNav"
    >
      <s.BottomBar isChatOpen={props.isChatOpen} windowWidth={props.windowWidth}>
        <s.BottomNav>
          {navItems.map(navItem => {
            const count = navItem.count
              ? ['invitations', 'accepted'].includes(navItem.key) ? ` (${navItem.count})` : displayCnt(navItem.count)
              : '';
            return (
              <s.Link
                to={navItem.url}
                target="_self"
                isExternal={navItem.isExternal}
                isVisible={props.isVisible}
                isActive={navItem.isActive}
                key={navItem.key}
                item={navItem.key}
                isNew={navItem.isNew || false}
                title={navItem.title || ''}
                onClick={() => props.onAction('acceptBanner')}
              >
                {navItem.key === 'recommendations'
                  ? [
                      <s.DRItem key="DR_label">
                        <s.Label size="large">{"Today's"}</s.Label>
                        <s.Label size="small">Matches</s.Label>
                      </s.DRItem>,
                      !!navItem.count && (
                        <s.Count key="DR_Count">
                          <s.Number>{navItem.count}</s.Number>
                        </s.Count>
                      ),
                    ]
                  : `${navItem.label}${count}`}
              </s.Link>
            );
          })}
          {hasExtraItems && (
            <s.Link isArrowVisible isActive={validDropdown.filter(item => item.isActive === true).length > 0} isVisible={props.isVisible}>
              More
              <s.DropdownArrow />
              <s.DropdownNav>
                {validDropdown.map(item => (
                  <s.DropdownLink to={item.url} target="_self" isExternal={item.isExternal} key={item.key}>
                    {item.label}
                  </s.DropdownLink>
                ))}
              </s.DropdownNav>
            </s.Link>
          )}
        </s.BottomNav>
      </s.BottomBar>
      <s.RefineSearchBtn
        isFacetOffScreen={props.isFacetOffScreen}
        isChatOpen={props.isChatOpen}
        windowWidth={props.windowWidth}
        isVisible={props.isFacetTitleFixed && !props.isFacetOffScreen}
      >
        Refine Search
      </s.RefineSearchBtn>
    </s.BottomBarWrapper>
  );
};

BottomBar.defaultProps = {
  navItems: [],
};

const membershipProptypes = {
  accountType: PropTypes.string.isRequired,
  wasPaidUser: PropTypes.bool.isRequired,
};

BottomBar.propTypes = {
  navItems: PropTypes.arrayOf(PropTypes.object),
  isChatOpen: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
  windowWidth: PropTypes.number.isRequired,
  isFacetTitleFixed: PropTypes.bool.isRequired,
  isFacetOffScreen: PropTypes.bool.isRequired,
  membership: PropTypes.shape(membershipProptypes).isRequired,
  activeTopNavItem: PropTypes.string.isRequired,
};

export default BottomBar;
