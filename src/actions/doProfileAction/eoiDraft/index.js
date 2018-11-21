import apiGetDrafts from './apiGetDrafts';
import apiNewDraft from './apiNewDraft';
import apiModifyDraft from './apiModifyDraft';

export default (uid, args, params) => {
  const { source, self, type, getState } = params;
  const premiumExperiment =
    (getState().session.settings.experiments.premium_message && getState().session.settings.experiments.premium_message.bucket) || 'A';
  switch (type) {
    case 'loadDrafts':
    case 'reloadDrafts': {
      const { draftsLoadedAt } = (premiumExperiment === 'B' && getState().modal.acceptPremium) || getState().modal.sendRequest;
      const now = new Date() / 1;
      if (now - draftsLoadedAt <= 15000) {
        return null;
      }
      return apiGetDrafts(params);
    }
    case 'newDraft': {
      const [text] = args;
      return apiNewDraft(text, params);
    }
    case 'modifyDraft': {
      const [text, id] = args;
      return apiModifyDraft(id, text, params);
    }
    default:
      console.log('TO DO draftAction', type, { source, uid, args, self });
      return null;
  }
};
