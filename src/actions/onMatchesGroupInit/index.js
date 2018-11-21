import withAuth from '../withAuth';
import fetchDiscover from './fetchDiscover';
import fetchIntents from './fetchIntents';

import { getGroupItemsInfo } from './utils';

export default params => (dispatch, getState) => {
  withAuth(
    ({ auth }, history) => {
      const { grpType } = params;
      getState().config.app.webp !== '0' && (params.file_extension = 'webp');
      const discoverTypes = getGroupItemsInfo(grpType);
      switch (grpType) {
        case 'discover':
          fetchDiscover(dispatch, getState(), { ...params, discoverTypes });
          break;
        case 'intents':
          fetchIntents(dispatch, getState(), { ...params, discoverTypes });
          break;
        // no default
      }
    },
    { caller: 'onMatchesGroupInit', allowCache: true, delay: 1 },
  );
};
