import { identifyCommunity } from '../utils';

const community = identifyCommunity(window.location.hostname);

const initialState = {
  img: {
    src: community.logo,
    alt: 'Shaadi.com',
    title: community.tagline,
  },
  url: '/',
  isExternal: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
