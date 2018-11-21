import React from 'react';
import PropTypes from '../../PropTypes';
import CardSwiper from '../CardSwiper';
import { MatchListItemContainer, OverlayStyles } from './styles';

class MatchListItem extends React.PureComponent {
  render() {
    const { children, showConnectOverlay, membershipTag, plan, hidden, id } = this.props;
    if (hidden) return null;
    return (
      <CardSwiper
        id={id}
        forceOverlay={showConnectOverlay}
        onSwipeLeft={this.props.onSwipeLeft}
        onSwipeRight={this.props.onSwipeRight}
        onTap={this.props.onTap}
        overlayText={'Connect Now'}
        overlayStyles={OverlayStyles}
      >
        <MatchListItemContainer plan={plan} tag={membershipTag}>
          {children}
        </MatchListItemContainer>
      </CardSwiper>
    );
  }
}

MatchListItem.defaultProps = {};

MatchListItem.propTypes = {
  id: PropTypes.string.isRequired,
  hidden: PropTypes.bool.isRequired,
  onSwipeLeft: PropTypes.func.isRequired,
  onSwipeRight: PropTypes.func.isRequired,
  onTap: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  showConnectOverlay: PropTypes.bool.isRequired,
  membershipTag: PropTypes.string.isRequired,
  plan: PropTypes.string.isRequired,
};

export default MatchListItem;
