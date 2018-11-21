import { combineReducers } from 'redux';
import types from '../../action_types';

const icons = {
  diet: {
    Veg: {
      icon: 'veg',
      desc: 'Vegetarian',
      title: 'Vegetarian',
    },
    Vegan: {
      icon: 'veg',
      desc: 'Vegan',
      title: 'Vegan',
    },
    Jain: {
      icon: 'veg',
      desc: 'Jain diet',
      title: 'Jain diet',
    },
    Eggetarian: {
      icon: 'eggetarian',
      desc: 'Eggetarian',
      title: 'Eggetarian',
    },
    'Non-Veg': {
      icon: 'non_veg',
      desc: 'Non-Vegetarian',
      title: 'Non-Vegetarian',
    },
    'Occasionally Non-Veg': {
      icon: 'non_veg',
      desc: 'Occasionally Non-Vegetarian',
      title: 'Occasionally Non-Vegetarian',
    },
  },

  drink: {
    No: {
      icon: 'no_drink',
      desc: "Doesn't Drink",
      title: "Doesn't Drink",
    },
    Occasionally: {
      icon: 'drinks',
      desc: 'Drinks Occasionally',
      title: 'Drinks Occasionally',
    },
    Yes: {
      icon: 'drinks',
      desc: 'Drinks Often',
      title: 'Drinks Often',
    },
  },

  smoke: {
    No: {
      icon: 'dont_smoke',
      desc: "Doesn't Smoke",
      title: "Doesn't Smoke",
    },
    Occasionally: {
      icon: 'smoke',
      desc: 'Smokes Occasionally',
      title: 'Smokes Occasionally',
    },
    Yes: {
      icon: 'smoke',
      desc: 'Smokes Often',
      title: 'Smokes Often',
    },
  },

  interests: {
    hobbies: {
      icon: 'interests',
      title: 'INTERESTS & HOBBIES',
    },
    cuisines: {
      icon: 'cuisines',
      title: 'CUISINE',
    },
    books: {
      icon: 'books',
      title: 'Books',
    },
    sports: {
      icon: 'sports',
      title: 'Sports',
    },
    movies: {
      icon: 'movies',
      title: 'Movies',
    },
    music: {
      icon: 'music',
      title: 'Music',
    },
  },
};

const skinToneMap = {
  Wheatish: 'Wheatish skin tone',
  Fair: 'Fair skinned',
  Dark: 'Dark skinned',
  'Very Fair': 'Very Fair skinned',
};

const album = (state = [], { type, payload = {} } = {}) => {
  switch (type) {
    case types.WIDGET_MATCHES_CACHE:
    case types.WIDGET_MATCHES_SUCCESS:
    case types.PREFERRED_SEARCH_CACHE:
    case types.PREFERRED_SEARCH_SUCCESS:
    case types.OTHER_SEARCH_SUCCESS:
      return [payload.fullPhotoBlur || state[0]].concat(state.slice(1));
    case types.SESSION_SUCCESS:
    case types.PROFILE_SUCCESS:
      return [payload.fullPhotoBlur].concat((payload.otherPhotos || state.slice(1)).map(ph => ph.fullPhotoBlur));
    case types.GET_OTHER_PROFILE_PHOTOS_SUCCESS:
      return (
        (payload.data &&
          payload.data.photo_details &&
          payload.data.photo_details.photos instanceof Array &&
          payload.data.photo_details.photos.map(photo => photo.domain_name + (photo.semilarge || photo['250x310']))) ||
        state
      );
    case types.GET_OTHER_PROFILE_PHOTOS_REQUEST:
    case types.GET_OTHER_PROFILE_PHOTOS_FAIL:
    default:
      return state;
  }
};

const albumRevamp = (state = [], { type, payload = {} } = {}) => {
  switch (type) {
    case types.WIDGET_MATCHES_CACHE:
    case types.WIDGET_MATCHES_SUCCESS:
    case types.PREFERRED_SEARCH_CACHE:
    case types.PREFERRED_SEARCH_SUCCESS:
    case types.OTHER_SEARCH_SUCCESS:
      return [payload.photoBlur || state[0]].concat(state.slice(1));
    case types.SESSION_SUCCESS:
    case types.PROFILE_SUCCESS: {
      return (payload.otherPhotos || state).length ? (payload.otherPhotos || state).map(ph => ph.photoBlur) : [payload.photoBlur];
    }
    case types.GET_OTHER_PROFILE_PHOTOS_SUCCESS:
      return (
        (payload.data &&
          payload.data.photo_details &&
          payload.data.photo_details.photos instanceof Array &&
          payload.data.photo_details.photos.map(photo => photo.domain_name + (photo.medium || photo['450X600']))) ||
        state
      );
    case types.GET_OTHER_PROFILE_PHOTOS_REQUEST:
    case types.GET_OTHER_PROFILE_PHOTOS_FAIL:
    default:
      return state;
  }
};

const infoMap = (state = [], action) => {
  switch (action.type) {
    case types.SESSION_SUCCESS:
    case types.PROFILE_SUCCESS: {
      const { detailed } = action.payload;
      if (!detailed || !detailed.infoMap) {
        return state;
      }
      return [...detailed.infoMap];
    }
    default:
      return state;
  }
};

const infoMapRevamp = (state = [], action) => {
  switch (action.type) {
    case types.SESSION_SUCCESS:
    case types.PROFILE_SUCCESS: {
      const { detailed } = action.payload;
      if (!detailed || !detailed.infoMapRevamp) {
        return state;
      }
      return [...detailed.infoMapRevamp];
    }
    default:
      return state;
  }
};

const initialAboutState = {
  title: 'About',
  titleRevamp: 'About',
  icon: 'about',
  desc: '',
};

const about = (state = initialAboutState, action) => {
  switch (action.type) {
    case types.SESSION_SUCCESS:
    case types.PROFILE_SUCCESS: {
      const { detailed, gender } = action.payload;
      if (!detailed || !detailed.about) {
        return state;
      }
      return {
        ...state,
        title: `About ${gender === 'Male' ? 'Him' : 'Her'}`,
        titleRevamp: `About ${action.payload.name || action.payload.userHandle || '...'}`,
        desc: detailed.about,
      };
    }
    default:
      return state;
  }
};

const initialContactState = {
  title: 'Contact Details',
  titleRevamp: 'Contact Details',
  icon: 'contact_details',
  desc: '',
};
const contact = (state = initialContactState, action) => {
  switch (action.type) {
    case types.SESSION_SUCCESS:
    case types.PROFILE_SUCCESS: {
      const { detailed } = action.payload;
      if (!detailed || !detailed.contact) {
        return state;
      }
      return {
        ...state,
        title: `Contact Details `,
        titleRevamp: `Contact Details`,
        desc: detailed.contact,
      };
    }
    default:
      return state;
  }
};

const initialLifestyleState = {
  title: 'Lifestyle & Appearance',
  icon: 'lifestyle',
  items: [],
};

const lifestyle = (state = initialLifestyleState, action) => {
  switch (action.type) {
    case types.SESSION_SUCCESS:
    case types.PROFILE_SUCCESS: {
      const { detailed } = action.payload;
      if (!detailed || !detailed.lifestyle) {
        return state;
      }

      let descTitleTemp = '';
      let lifestyleItem3 = {};

      if (detailed.lifestyle.complexion) {
        descTitleTemp = skinToneMap[[detailed.lifestyle.complexion]];
      }
      if (detailed.lifestyle.body_built) {
        descTitleTemp =
          (descTitleTemp !== '' && `${descTitleTemp}, ${detailed.lifestyle.body_built} build`) || `${detailed.lifestyle.body_built} build`;
      }

      if (descTitleTemp !== '') {
        lifestyleItem3 = {
          key: 'lifestyle-item-3',
          icon: 'body_type',
          desc: descTitleTemp,
          title: descTitleTemp,
        };
      }

      return {
        ...state,
        items: [
          {
            key: 'lifestyle-item-0',
            ...icons.diet[detailed.lifestyle.diet],
          },
          {
            key: 'lifestyle-item-1',
            ...icons.drink[detailed.lifestyle.drink],
          },
          {
            key: 'lifestyle-item-2',
            ...icons.smoke[detailed.lifestyle.smoke],
          },
          lifestyleItem3,
        ],
      };
    }
    default:
      return state;
  }
};

const initialInterestsState = {
  title: 'Interests & More',
  icon: 'interests',
  items: [],
};
const interests = (state = initialInterestsState, action) => {
  switch (action.type) {
    case types.SESSION_SUCCESS:
    case types.PROFILE_SUCCESS: {
      const { detailed } = action.payload;
      if (!detailed || !detailed.interests) {
        return state;
      }
      const { hobbies, cuisines, books, sports, movies, music, dressStyle } = detailed.interests;
      return {
        ...state,
        items: [
          hobbies ? { key: 'interests-0', ...icons.interests.hobbies, desc: hobbies.join(', ') } : null,
          cuisines ? { key: 'interests-1', ...icons.interests.cuisines, desc: cuisines.join(', ') } : null,
          books ? { key: 'interests-2', ...icons.interests.books, desc: books.join(', ') } : null,
          sports ? { key: 'interests-3', ...icons.interests.sports, desc: sports.join(', ') } : null,
          movies ? { key: 'interests-4', ...icons.interests.movies, desc: movies.join(', ') } : null,
          music ? { key: 'interests-5', ...icons.interests.music, desc: music.join(', ') } : null,
        ].filter(f => f),
        extra: [ // eslint-disable-line prettier/prettier
          dressStyle ? { key: 'interest-6', desc: dressStyle.join(', ') } : null,
        ].filter(f => f), // eslint-disable-line prettier/prettier
      };
    }
    default:
      return state;
  }
};

const initialBackgroundState = {
  title: 'Background',
  icon: 'background',
  items: [],
};
const background = (state = initialBackgroundState, action) => {
  switch (action.type) {
    case types.SESSION_SUCCESS:
    case types.PROFILE_SUCCESS: {
      const { detailed } = action.payload;
      if (!detailed || !detailed.background) {
        return state;
      }
      return {
        ...state,
        items: detailed.background,
      };
    }
    default:
      return state;
  }
};

const initialEducationState = {
  title: 'Education & Career',
  icon: 'education',
  items: [],
  hasCollegeOrEmployer: false,
};

const education = (state = initialEducationState, action) => {
  switch (action.type) {
    case types.SESSION_SUCCESS:
    case types.PROFILE_SUCCESS: {
      const { detailed } = action.payload;
      if (!detailed || !detailed.education) {
        return state;
      }
      return {
        ...state,
        ...detailed.education,
      };
    }
    default:
      return state;
  }
};

const initialHoroscopeState = {
  title: 'Horoscope Details',
  icon: 'astro',
  isGamified: false,
  items: [],
};
const horoscope = (state = initialHoroscopeState, action) => {
  switch (action.type) {
    case types.SESSION_SUCCESS:
    case types.PROFILE_SUCCESS: {
      const { detailed } = action.payload;
      if (!detailed || !detailed.horoscope) {
        return state;
      }
      return {
        ...state,
        items: [
          {
            key: 'horoscope-item-0',
            icon: 'profile_rashi',
            desc: detailed.horoscope.moon_sign || null,
          },
          {
            key: 'horoscope-item-1',
            icon: 'profile_nakshatra',
            desc: detailed.horoscope.birth_star || null,
          },
          {
            key: 'horoscope-item-3',
            icon: 'profile_manglik',
            desc: detailed.horoscope.manglik || null,
          },
          {
            key: 'horoscope-item-2',
            icon: 'profile_info',
            link: detailed.horoscope.link,
            desc: detailed.horoscope.score && detailed.horoscope.score.maxscore ? '' : detailed.horoscope.info,
          },
        ].filter(f => f.desc),
        horoscopeMatch: detailed.horoscope.score || {},
        info: detailed.horoscope.info || '',
        link: detailed.horoscope.link || '',
        isGamified: detailed.horoscope.is_gamified || false,
      };
    }
    default:
      return state;
  }
};

const trustBadges = (state = [], action) => {
  switch (action.type) {
    case types.SESSION_SUCCESS:
    case types.PROFILE_SUCCESS: {
      const { detailed } = action.payload;
      if (!detailed || !detailed.trustBadges) {
        return state;
      }
      return [...detailed.trustBadges];
    }
    default:
      return state;
  }
};

const initialFamilyState = {
  title: 'Family Details',
  icon: 'family',
  isGamified: false,
  desc: '',
};

const family = (state = initialFamilyState, action) => {
  switch (action.type) {
    case types.SESSION_SUCCESS:
    case types.PROFILE_SUCCESS: {
      const { detailed, gender } = action.payload;
      if (!detailed || !detailed.family) {
        return state;
      }
      return {
        ...state,
        title: gender === 'Male' ? 'His Family' : 'Her Family',
        ...detailed.family,
      };
    }
    default:
      return state;
  }
};

const initialPreferencesState = {
  title: 'Preferences Details',
  icon: 'preferences',
  isGamified: false,
  items: [],
};
const preferences = (state = initialPreferencesState, action) => {
  switch (action.type) {
    case types.SESSION_SUCCESS:
    case types.PROFILE_SUCCESS: {
      const { detailed } = action.payload;
      if (!detailed || !detailed.preferences) {
        return state;
      }
      return {
        ...state,
        ...action.payload.detailed.preferences,
      };
    }
    default:
      return state;
  }
};

const commonInterests = (state = [], action) => {
  switch (action.type) {
    case types.PROFILE_SUCCESS: {
      const { detailed } = action.payload;
      if (!detailed || !detailed.commonInterests) {
        return state;
      }
      return [...detailed.commonInterests];
    }
    default:
      return state;
  }
};

export default combineReducers({
  album,
  albumRevamp,
  infoMap,
  infoMapRevamp,
  about,
  contact,
  lifestyle,
  interests,
  background,
  education,
  horoscope,
  family,
  preferences,
  trustBadges,
  commonInterests,
});
