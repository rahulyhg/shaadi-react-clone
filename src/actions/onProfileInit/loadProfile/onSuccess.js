import { GA } from '../../lib/utils';
import doProfileAction from '../../doProfileAction';

export default (action, { dispatch, getState, location }) => {
  console.log('%c connectionStatus', 'color: green; font-size: 20px', action.payload.flags.connectionStatus);
  console.log('%c albumStatus', 'color: green; font-size: 20px', action.payload.flags.albumStatus);
  GA.trackProfileViews(getState().session.settings);
  if (location.pathname.indexOf('daily-recommendations') >= 0) {
    const DRConnectionStatus = ['ignored', 'blocked', 'theyDeclined', 'declined', 'theyAccepted', 'accepted', 'contacted'];
    const DRstate = (getState().dailyRecommendationPage && getState().dailyRecommendationPage.recommendations) || {};
    let drAction = '';
    if (action.payload.uid) {
      const currentDrItem = DRstate.items.filter(item => item.uid === action.payload.uid);
      drAction = currentDrItem[0] && currentDrItem[0].recommendation && currentDrItem[0].recommendation.action;
    }
    if (DRConnectionStatus.includes(action.payload.flags.connectionStatus) && !drAction) {
      doProfileAction('daily-recommendations', action.payload.uid, 'auto_move')(dispatch, getState);
      doProfileAction('daily-recommendations', action.payload.uid, 'dr_ignore')(dispatch, getState);
    }
  }
  dispatch(action);
};
