import { combineReducers } from 'redux';

import settings from './settings';
import windows from './windows';
import sidebar from './sidebar';
import counts from './counts';
import messages from './messages';
import flash from './flash';
import notifications from './notifications';
import skew from './skew';

export default combineReducers({
  settings,
  flash,
  windows,
  sidebar,
  counts,
  messages,
  notifications,
  skew,
});
