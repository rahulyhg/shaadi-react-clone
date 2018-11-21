import profile from '../profile';

export default (base = undefined, payload) => ({
  matches: {
    items: payload.matches.map((user, i) => ({
      profile: profile(undefined, user),
    })),
  },
  accepted: {
    items: payload.accepted.map((user, i) => ({
      profile: profile(undefined, user),
    })),
  },
  shortlisted: {
    items: payload.shortlist.map((user, i) => ({
      profile: profile(undefined, user),
    })),
  },
});
