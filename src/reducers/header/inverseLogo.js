import { identifyCommunity } from '../utils';
import types from '../../action_types';

let community = identifyCommunity(window.location.hostname);

const initialState = {
  img: {
    src: community.inverseLogo,
    alt: 'Shaadi.com',
    title: community.tagline,
  },
  url: '/',
  isExternal: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_INVERSE_LOGO: {
      const { domain = 'www.shaadi.com' } = action.payload;
      community = identifyCommunity(domain);
      return {
        img: {
          src: community.inverseLogo,
          alt: community.domainName,
          title: community.tagline,
        },
        url: '/',
        isExternal: true,
      };
    }
    default:
      return state;
  }
}
