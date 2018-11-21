import { response, ProfileInfo } from '../../../../pages/MyShaadiDashboard/__tests__/utils/factory';

const dashBoard = response;
const props = {
  settings: {
    isPaidUser: true,
    isHidden: false,
    canSendPasswordOnConnect: false,
    canConnectWithMessage: true,
    hasUploadedPhoto: true,
    showUpgradeBanner: false,
  },
};
const matchesTypes = {
  discovery_premium: {
    heading: 'Premium Matches',
    type: 'discovery_premium',
    widget: 'default',
  },
  'recently-joined': {
    heading: 'New Matches for you',
    type: 'recently-joined',
    widget: 'default',
  },
  discovery_recent_visitors: {
    heading: 'Recent Visitors',
    type: 'discovery_recent_visitors',
    widget: 'default',
  },
};
const profiles = { ...ProfileInfo };
const widgetsType = ['default', 'carousal'];
export { props, dashBoard, matchesTypes, widgetsType, profiles };
it('should export props', () => {
  expect(Object.keys(props).length).toEqual(1);
});
