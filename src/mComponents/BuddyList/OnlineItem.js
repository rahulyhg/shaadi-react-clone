/* eslint camelcase: 0 */

import React from 'react';
import PropTypes from '../../PropTypes';
import {
  PageContent,
  FriendListContainer,
  FriendListWrap,
  ProfileInfo,
  ImageContainer,
  ChatProDetailWrap,
  ChatListSep,
  ChatPitem,
  ChatProid,
  MemOnline,
  Clearfix,
} from './styles';
import Link from '../Common/Link';

const OnlineItem = ({ uid, thumbnail, name, ageHeight, location, profession }) => (
  <PageContent>
    <FriendListContainer>
      <FriendListWrap>
        <Link to={`/inbox/chats/history/pid/${uid}`}>
          <ProfileInfo>
            <ImageContainer src={thumbnail} passThrough={['src']} />
            <ChatProDetailWrap>
              <ChatProid>{name}</ChatProid>
              <MemOnline />
              <Clearfix />
              <ChatPitem>{profession}</ChatPitem>
              <ChatPitem>
                {ageHeight}, {location}
              </ChatPitem>
              <Clearfix />
            </ChatProDetailWrap>
            <Clearfix />
            <ChatListSep />
          </ProfileInfo>
        </Link>
      </FriendListWrap>
    </FriendListContainer>
  </PageContent>
);

OnlineItem.propTypes = {
  uid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  ageHeight: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  profession: PropTypes.string.isRequired,
};

export default OnlineItem;
