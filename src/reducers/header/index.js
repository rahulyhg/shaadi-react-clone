import { combineReducers } from 'redux';
import headerBadge from './headerBadge';
import logo from './logo';
import inverseLogo from './inverseLogo';
import membership from './membership';
import thumbnail from './thumbnail';
import activeDropdown from './activeDropdown';
import fourHourTicker from './fourHourTicker';

export default combineReducers({
  headerBadge,
  logo,
  inverseLogo,
  membership,
  thumbnail,
  activeDropdown,
  fourHourTicker,
});
