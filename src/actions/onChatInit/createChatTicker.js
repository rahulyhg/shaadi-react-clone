import apiGetChatData from './apiGetChatData';

let tick = 0;

export default (auth, dispatch, getState, config = {}) => () => {
  tick += 1;
  console.log('chat data update', tick);
  apiGetChatData(auth, dispatch, getState, null, config);
};
