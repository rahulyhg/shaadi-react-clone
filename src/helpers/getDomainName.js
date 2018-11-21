import identifyCommunity from '../reducers/utils/identifyCommunity';

export default () => identifyCommunity(window.location.hostname).domainName;
