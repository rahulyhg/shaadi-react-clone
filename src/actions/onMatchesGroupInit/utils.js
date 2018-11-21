const getGroupItemsInfo = gptype => {
  switch (gptype) {
    case 'discover': {
      return ['discovery_recent_visitors', 'discovery_premium', 'broader', 'reverse'];
    }
    case 'intents': {
      return ['full-profile', 'shortlisted', 'ignored', 'blocked'];
    }
    default: {
      return [];
    }
  }
};

export { getGroupItemsInfo };
