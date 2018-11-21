import { combineReducers } from 'redux';
import { createWidgetReducer } from '../utils';

import item from './item';
import pagination from './pagination';
import gamification from './gamification';
import profilePageLeftBanner from './profilePageLeftBanner';
import autoMove from './autoMove';

export default combineReducers({
  item,
  pagination,
  similarMatches: createWidgetReducer('profile-similar-profiles'),
  newMatches: createWidgetReducer('profile-new-matches'),
  gamification,
  profilePageLeftBanner,
  autoMove,
});
