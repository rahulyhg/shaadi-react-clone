import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';
import MiniCarousel from '../MiniCarousel';
import Tooltip from '../Tooltip';

class DrQueue extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.renderConnectStatus = this.renderConnectStatus.bind(this);
  }

  renderConnectStatus(item) { //eslint-disable-line    
    const profile = this.props.profiles[item.uid] || {};
    const connectionStatus = [
      'theyAccepted',
      'accepted',
      'contacted',
      'hidden',
      'deleted',
      'theyBlocked',
      'ignored',
      'blocked',
      'theyDeclined',
      'declined',
    ];
    let action = (profile && profile.flags && profile.flags.connectionStatus) || '';
    if (!connectionStatus.includes(action)) {
      action = item.recommendation.action;
    }
    switch (action) {
      case 'yes':
      case 'theyAccepted':
      case 'accepted':
      case 'contacted':
        return <s.DrAcceptedYes />;
      case 'no':
      case 'hidden':
      case 'deleted':
      case 'theyBlocked':
      case 'ignored':
      case 'blocked':
      case 'theyDeclined':
      case 'declined':
        return <s.DrAcceptedNo />;
      case 'maybe':
        return <s.DrAcceptedMayBe />;
      default: {
        if ((item.flags.isHidden || item.flags.isDeleted) && item.recommendation.action !== '') {
          return <s.DrAcceptedNo />;
        }
      }
    }
  }

  renderDisable() { //eslint-disable-line    
    const profilePageBucket = ['B', 'C'].includes(this.props.profilePageBucket);
    const overlayMessage = `To view this Profile, click Yes ${profilePageBucket ? '' : ', Maybe '}or No on the current recommendation.`;
    return (
      <Tooltip
        trigger="hover"
        placement="bottom"
        overlayClassName="rc-tooltip-dark-invite"
        offset={[0, -5]}
        overlay={<span>{overlayMessage}</span>} //eslint-disable-line
      >
        <s.DrDisable />
      </Tooltip>
    );
  }

  renderItem(item, i) {
    const isDisable = this.props.disablePros.includes(item.uid);
    const to = isDisable ? '' : `/profile/daily-recommendations?profileid=${item.uid}&evt_ref=${this.props.evt_ref}`;
    return (
      <s.DrItemLink to={to} key={i}>
        <s.DrQueueImgWrap>
          <img src={item.thumbnail} width="40" height="40" alt={item.name} />
          {this.renderConnectStatus(item)}
        </s.DrQueueImgWrap>
        {item.uid === this.props.defaultProfileId && <s.DrProfilePointer profilePageBucket={this.props.profilePageBucket} />}
        {isDisable && this.renderDisable()}
      </s.DrItemLink>
    );
  }

  render() {
    const items = this.props.queue;
    const goto = items.findIndex(item => item.uid === this.props.defaultProfileId) || 0;
    return (
      <s.DrQueue profilePageBucket={this.props.profilePageBucket}>
        <MiniCarousel
          maxComponentsInFrame={4}
          height={60}
          width={224}
          slidesCnt={items.length}
          steps={1}
          goto={goto + 1}
          profilePageBucket={this.props.profilePageBucket}
        >
          <s.DrItemWrap>{items.map(this.renderItem)}</s.DrItemWrap>
        </MiniCarousel>
      </s.DrQueue>
    );
  }
}
DrQueue.defaultProps = {
  profilePageBucket: 'A',
};
DrQueue.propTypes = {
  queue: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  profiles: PropTypes.shape({}).isRequired,
  defaultProfileId: PropTypes.string.isRequired,
  evt_ref: PropTypes.string.isRequired,
  disablePros: PropTypes.arrayOf(PropTypes.string).isRequired,
  profilePageBucket: PropTypes.string,
};

export default DrQueue;
