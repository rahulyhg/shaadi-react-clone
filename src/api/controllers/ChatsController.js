import batchRequestService from '../services/batchRequestService';
import ww4 from '../ww4';
import decorators from '../decorators';

const defaultValues = {
  alerts: [],
  chats: { unread: 0, items: [] },
  online: {
    accepted: { items: [] },
    shortlisted: { items: [] },
    matches: { items: [] },
  },
};

const index = (logger, query, auth, config = {}) => {
  const { uid } = auth;
  const { file_extension } = query;
  const selfChatPresence = {
    method: 'get',
    relative_url: `/profiles/${uid}/presence`,
    query: {
      platform: auth.platform,
      profileids: uid,
    },
  };
  const requests = {
    selfChatPresence,
  };
  if (config.isMobile && config.chatList === 'recentChats') {
    requests.chats = ww4.chats(uid, file_extension);
  }
  if (config.isMobile && config.chatList === 'buddyList') {
    requests.buddylist = ww4.buddylist(uid, file_extension);
  }
  if (!config.isMobile || !config.chatList) {
    requests.chats = ww4.chats(uid, file_extension);
    requests.buddylist = ww4.buddylist(uid, file_extension);
    requests.chatWindows = ww4.chatWindows(uid);
  }

  const chatResponse = batchRequestService(logger, query, auth, requests, data => {
    const { chats, buddylist, chatWindows } = data;

    return {
      online: (buddylist && decorators.buddylist(undefined, buddylist.data)) || defaultValues.online,
      chats: (chats && decorators.chats(undefined, chats, uid)) || defaultValues.chats,
      chatWindows: (chatWindows && decorators.chatWindows(chatWindows.data)) || [],
      selfPresence: (data.selfChatPresence.data[uid] && data.selfChatPresence.data[uid][0]) || {},
      otherChatData: { items: [] },
    };
  });
  if (config.isMobile) {
    return chatResponse;
  }

  return chatResponse.then(response => {
    const { chats, chatWindows } = response.data;
    const profilesInChat = chats.items.map(chatProfile => chatProfile.uid);
    const missingProfiles = chatWindows.filter(chatWindow => !profilesInChat.includes(chatWindow.uid));
    if (missingProfiles.length === 0) {
      return {
        ...response,
        data: {
          ...response.data,
          otherChatData: { items: [] },
        },
      };
    }
    // ww4.chatPanelProfile
    // ww4.profile
    const chatProfileRequest = config.isMobile ? 'profile' : 'chatPanelProfile';
    const profilesRequests = {
      chatProfiles: ww4[chatProfileRequest](uid, missingProfiles.map(p => p.uid), file_extension, 'chat'),
    };
    return batchRequestService(logger, query, auth, profilesRequests, profilesResponse => {
      const { chatProfiles } = profilesResponse;
      const otherChatData = {};
      otherChatData.items = Object.keys(chatProfiles.data).map(profileUid => ({
        profile: decorators.profile(undefined, chatProfiles.data[profileUid]),
      }));
      return {
        ...response.data,
        otherChatData,
      };
    });
  });
};

export default {
  index,
};
