import { combineReducers } from 'redux';

import album from './album';
import bannerPhoto from './bannerPhoto';

export default combineReducers({
  album,
  bannerPhoto,
});
