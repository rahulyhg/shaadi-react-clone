import apiGetNotifications from './apiGetNotifications';
import onAlertsSuccess from './onAlertsSuccess';

let tick = 0;

export default (auth, dispatch, getState) => () => {
  tick += 1;
  console.log('alerts data update', tick);
  apiGetNotifications(auth, dispatch, getState, onAlertsSuccess, tick);
};
