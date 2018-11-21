/* eslint camelcase: 0 */

import React from 'react';
import PropTypes from '../../PropTypes';
import ChatItem from './ChatItem';
import Spinner from '../../mComponents/Spinner';
import { getDownloadAppLink } from '../../mComponents/utils';
import {
  RecentChatListContainer,
  NoRcChatMainWrap,
  NoRcChatWrap,
  NoRcChat,
  NoRcCopy1,
  NoRcCopy2,
  ChatExpWrap,
  ChatExpClose,
  DownloadApp,
  DownloadLink,
  DownloadAppText,
  Clearfix,
} from './styles';

const extract = (list, key) => ((list.find(h => h.key === key) || {}).value || '').replace(',', key === 'age-height' ? ' yrs,' : ',');

const overrides = {
  Male: {
    requestPassword: '/assets/mobile/inbox_male_pp.png',
    passwordRequested: '/assets/mobile/inbox_male_pp.png',
    noPhoto: '/assets/mobile/inbox_male_pp.png',
  },
  Female: {
    requestPassword: '/assets/mobile/inbox_female_pp.png',
    passwordRequested: '/assets/mobile/inbox_female_pp.png',
    noPhoto: '/assets/mobile/inbox_female_pp.png',
  },
};

const appLinkInfo = getDownloadAppLink();

// eslint-disable-next-line
class RecentChatList extends React.Component {
  constructor() {
    super();
    this.closeDownloadBanner = this.closeDownloadBanner.bind(this);
  }

  closeDownloadBanner(event) {
    event.preventDefault();
    this.props.onAction('hideDownloadBanner');
  }

  renderDownloadBanner = () => (
    <ChatExpWrap>
      <ChatExpClose onClick={this.closeDownloadBanner} />
      <DownloadApp>
        <DownloadLink to={appLinkInfo.link}>Download our app</DownloadLink>
        <DownloadAppText> for a better chat experience </DownloadAppText>
      </DownloadApp>
      <Clearfix />
    </ChatExpWrap>
  );

  render() {
    const { profiles, items, loading, downloadBannerVisible } = this.props;
    if (loading) {
      return <Spinner />;
    } else if (items.length === 0) {
      return (
        <RecentChatListContainer>
          <NoRcChatMainWrap>
            <NoRcChatWrap>
              <NoRcChat />
              <NoRcCopy1> You have no new Recent Chats</NoRcCopy1>
              <NoRcCopy2>
                Start a new conversation with<br />your{' '}
                <a href="https://www.shaadi.com/inbox/chats/buddy-list" className="ui-link">
                  Online Members
                </a>
              </NoRcCopy2>
            </NoRcChatWrap>
          </NoRcChatMainWrap>
        </RecentChatListContainer>
      );
    }
    return (
      <RecentChatListContainer>
        {downloadBannerVisible ? this.renderDownloadBanner() : null}
        {items.map(item => (
          <ChatItem
            key={item.uid}
            uid={item.uid}
            name={item.name}
            thumbnail={(overrides[profiles[item.uid].gender] || {})[profiles[item.uid].flags.albumStatus] || profiles[item.uid].thumbnail}
            lastMessage={item.lastMessage}
            lastMessageDate={item.lastMessageDate}
            unreadCount={item.unreadCount}
            ageHeight={extract(profiles[item.uid].base.detailList, 'age-height')}
            location={extract(profiles[item.uid].base.detailList, 'location')}
          />
        ))}
      </RecentChatListContainer>
    );
  }
}

RecentChatList.propTypes = {
  profiles: PropTypes.objectOf(PropTypes.shape(PropTypes.basicProfile)).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape(PropTypes.chatItem)).isRequired,
  loading: PropTypes.bool.isRequired,
  downloadBannerVisible: PropTypes.bool.isRequired,
  onAction: PropTypes.func.isRequired,
};

export default RecentChatList;
