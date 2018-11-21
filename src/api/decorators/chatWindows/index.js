import { timestamp } from '../utils';

const states = {
  '0': 'opened',
  '1': 'minimized',
  '2': 'stacked',
  '3': 'closed',
};

export default (payload = []) =>
  payload.map((chatWindow, i) => ({
    uid: chatWindow.profileid,
    status: states[`${chatWindow.state}`],
    updatedAt: timestamp(chatWindow.update_date),
    order: i,
  }));
