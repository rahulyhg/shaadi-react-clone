import PropTypes from 'prop-types';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import ChatIcon from '../../Common/ChatIcon';
import s from './styles';

const maxHeight = n => {
  if (n > 2) {
    return (n + 0.5) * 40;
  }
  return !n ? 50 : 40 * n;
};

class OnlineGroups extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      accordions: {
        accepted: props.items.accepted.length === 0 ? 'closed' : 'open',
        shortlisted: props.items.shortlisted.length === 0 ? 'closed' : 'open',
        matches: props.items.matches.length === 0 ? 'closed' : 'open',
      },
    };
    this.onGroupToggle = this.onGroupToggle.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.groups = [
      {
        key: 'accepted',
        title: 'Accepted Members',
      },
      {
        key: 'shortlisted',
        title: 'Shortlists & More',
      },
      {
        key: 'matches',
        title: 'My Matches',
      },
    ];
    this.renderNoData = this.renderNoData.bind(this);
  }
  componentWillReceiveProps(props) {
    const accordions = {};
    if (this.props.items.accepted.length === 0 && props.items.accepted.length > 0) {
      accordions.accepted = 'open';
    }
    if (this.props.items.shortlisted.length === 0 && props.items.shortlisted.length > 0) {
      accordions.shortlisted = 'open';
    }
    if (this.props.items.matches.length === 0 && props.items.matches.length > 0) {
      accordions.matches = 'open';
    }

    if (Object.keys(accordions).length > 0) {
      this.setState({ accordions: { ...this.state.accordions, ...accordions } });
    }
  }
  onGroupToggle(groupKey) {
    const { accordions } = this.state;
    if (accordions[groupKey] === 'closed') {
      accordions[groupKey] = 'open';
    } else {
      accordions[groupKey] = 'closed';
    }
    this.setState({ accordions });
    this.forceUpdate();
  }

  renderItem(item) {
    const { uid, name, thumbnail, chatDetails } = item;
    return (
      <div key={item.uid} style={{ minHeight: 36 }}>
        <s.OnlineUser
          onMouseEnter={e => this.props.onItemHover(e, uid, 'online')}
          onMouseLeave={e => this.props.onItemBlur(e, uid, 'online')}
          onClick={() => this.props.doChatWindowAction(uid, 'open')}
        >
          <s.Photo alt={name} src={thumbnail} />
          <s.Name>{name} </s.Name>
          <ChatIcon viewType="onlineTabChat" chatDetails={chatDetails} clickFn={() => {}} />
        </s.OnlineUser>
      </div>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderNoData(groupType) {
    if (groupType === 'shortlisted' || groupType === 'accepted') {
      return (
        <s.NoData>
          <s.NoDataIcon />
          <s.NoDataText>
            None of your&nbsp;
            {groupType === 'shortlisted' ? 'Shortlisted Members or Members whom you have sent Interests & Requests to' : 'Accepted Members'}
            &nbsp;are currently online.
          </s.NoDataText>
        </s.NoData>
      );
    } else if (groupType === 'matches') {
      return (
        <s.NoData>
          <s.NoDataIcon />
          <s.NoDataText>
            None of the Members matching your&nbsp;
            <s.PartnerLink to="/my-shaadi/partner-profile" target="_self" isExternal>
              Partner Preferences
            </s.PartnerLink>
            &nbsp;are currently online.
          </s.NoDataText>
        </s.NoData>
      );
    }
    return null;
  }

  render() {
    const { groups } = this;
    const { accordions } = this.state;
    return (
      <s.OnlineGroups>
        <Scrollbars autoHeight autoHeightMin={this.props.chatScrollHeight}>
          {groups.map(group => (
            <s.Group key={group.key}>
              <s.GroupHeading>
                <s.Title isGroupOpen={accordions[group.key] !== 'closed'} onClick={() => this.onGroupToggle(group.key)}>
                  {group.title} ({this.props.items[group.key].length})
                </s.Title>
              </s.GroupHeading>
              <s.UserList isVisible={accordions[group.key] !== 'closed'} height={maxHeight(this.props.items[group.key].length)}>
                {this.props.items[group.key].map(item => this.renderItem(item))}
                {!this.props.items[group.key].length && this.renderNoData(group.key)}
              </s.UserList>
            </s.Group>
          ))}
          {this.props.flash &&
            this.props.flash !== '...' &&
            groups.every(g => this.props.items[g.key].length === 0) && (
              <s.OnlineFlash title={this.props.flash}>Failed to connect. Please refresh and try again.</s.OnlineFlash>
            )}
        </Scrollbars>
      </s.OnlineGroups>
    );
  }
}

OnlineGroups.defaultProps = {
  flash: null,
};

OnlineGroups.itemPropType = PropTypes.shape({
  uid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
});

OnlineGroups.propTypes = {
  flash: PropTypes.string,
  items: PropTypes.shape({
    accepted: PropTypes.arrayOf(OnlineGroups.itemPropType).isRequired,
    shortlisted: PropTypes.arrayOf(OnlineGroups.itemPropType).isRequired,
    matches: PropTypes.arrayOf(OnlineGroups.itemPropType).isRequired,
    chatIcon: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }).isRequired,
  onItemHover: PropTypes.func.isRequired,
  onItemBlur: PropTypes.func.isRequired,
  doChatWindowAction: PropTypes.func.isRequired,
  chatScrollHeight: PropTypes.number.isRequired,
};

export default OnlineGroups;
