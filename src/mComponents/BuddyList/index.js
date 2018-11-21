import React from 'react';
import PropTypes from '../../PropTypes';
import OnlineItem from './OnlineItem';
import Spinner from '../../mComponents/Spinner';
import { getDownloadAppLink } from '../../mComponents/utils';
import {
  BuddyListContainer,
  NoRcChatMainWrap,
  NoRcChatWrap,
  NoRcChat,
  NoRcCopy1,
  NoRcCopy2,
  ChatExpWrap,
  ChatExpClose,
  Clearfix,
  DownloadApp,
  DownloadLink,
  DownloadAppText,
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
class BuddyList extends React.Component {
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
        <DownloadLink isExternal to={appLinkInfo.link}>
          Download our app
        </DownloadLink>
        <DownloadAppText> for a better chat experience </DownloadAppText>
      </DownloadApp>
      <Clearfix />
    </ChatExpWrap>
  );

  render() {
    const { profiles, online, loading, downloadBannerVisible } = this.props;
    if (loading) {
      return <Spinner />;
    } else if (online.accepted.length === 0 && online.matches.length === 0 && online.shortlisted.length === 0) {
      return (
        <BuddyListContainer>
          <NoRcChatMainWrap>
            <NoRcChatWrap>
              <NoRcChat />
              <NoRcCopy1> You have no matches online</NoRcCopy1>
              <NoRcCopy2>
                Start a new conversation with<br />your{' '}
                <a href="https://www.shaadi.com/inbox/chats/buddy-list" className="ui-link">
                  Online Members
                </a>
              </NoRcCopy2>
            </NoRcChatWrap>
          </NoRcChatMainWrap>
        </BuddyListContainer>
      );
    }
    return (
      <BuddyListContainer>
        {downloadBannerVisible ? this.renderDownloadBanner() : null}
        {online.accepted.map((item, index) => (
          <OnlineItem
            key={item.uid}
            uid={item.uid}
            name={item.name}
            thumbnail={(overrides[profiles[item.uid].gender] || {})[profiles[item.uid].flags.albumStatus] || profiles[item.uid].thumbnail}
            ageHeight={extract(profiles[item.uid].base.detailList, 'age-height')}
            location={extract(profiles[item.uid].base.detailList, 'location')}
            profession={extract(profiles[item.uid].base.detailList, 'profession')}
          />
        ))}
        {online.matches.map((item, index) => (
          <OnlineItem
            key={item.uid}
            uid={item.uid}
            name={item.name}
            thumbnail={(overrides[profiles[item.uid].gender] || {})[profiles[item.uid].flags.albumStatus] || profiles[item.uid].thumbnail}
            ageHeight={extract(profiles[item.uid].base.detailList, 'age-height')}
            location={extract(profiles[item.uid].base.detailList, 'location')}
            profession={extract(profiles[item.uid].base.detailList, 'profession')}
          />
        ))}
        {online.shortlisted.map((item, index) => (
          <OnlineItem
            key={item.uid}
            uid={item.uid}
            name={item.name}
            thumbnail={(overrides[profiles[item.uid].gender] || {})[profiles[item.uid].flags.albumStatus] || profiles[item.uid].thumbnail}
            ageHeight={extract(profiles[item.uid].base.detailList, 'age-height')}
            location={extract(profiles[item.uid].base.detailList, 'location')}
            profession={extract(profiles[item.uid].base.detailList, 'profession')}
          />
        ))}
      </BuddyListContainer>
    );
  }
}

BuddyList.propTypes = {
  online: PropTypes.shape({
    accepted: PropTypes.arrayOf(PropTypes.shape(PropTypes.chatOnlineItem)).isRequired,
    shortlisted: PropTypes.arrayOf(PropTypes.shape(PropTypes.chatOnlineItem)).isRequired,
    matches: PropTypes.arrayOf(PropTypes.shape(PropTypes.chatOnlineItem)).isRequired,
  }).isRequired,
  profiles: PropTypes.objectOf(PropTypes.shape(PropTypes.basicProfile)).isRequired,
  loading: PropTypes.bool.isRequired,
  downloadBannerVisible: PropTypes.bool.isRequired,
  onAction: PropTypes.func.isRequired,
};

export default BuddyList;
