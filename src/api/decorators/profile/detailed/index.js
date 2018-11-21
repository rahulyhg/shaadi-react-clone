import dataBuilder from './builder';

const baseValue = null;
const isValidPayload = payload =>
  [
    'account',
    'other',
    'basic',
    'appearance',
    'doctrine',
    'profession',
    'location',
    'origin',
    'trait',
    'interests_and_more',
    'lifestyle',
    'astro',
    'education',
  ].every(k => payload[k]);

export default (baseline = baseValue, payload, extra = {}) => {
  if (isValidPayload(payload)) {
    const { account, appearance, trait, lifestyle, score, derived_text, intents = {} } = payload;
    /* eslint-disable camelcase */
    const derivedText = derived_text;

    let state;
    state = {
      ...baseline,
      createdBy: account.posted_by,
      shortlistCount: (intents.shortlisted && intents.shortlisted.list_count) || 0,
      infoMap: dataBuilder.infoMap(payload),
      infoMapRevamp: dataBuilder.infoMapRevamp(payload),
      about: trait.about_me,
      interests: dataBuilder.interestsAndMore(payload),
      lifestyle: {
        ...lifestyle,
        complexion: appearance.complexion,
        body_built: appearance.built,
      },
      shortlisted: intents.shortlisted && intents.shortlisted.lists,
      background: dataBuilder.background(payload),
      education: dataBuilder.education(payload),
      commonInterests: [],
    };
    if (derivedText && derivedText.horoscope_details) {
      state = {
        ...state,
        horoscope: {
          birth_star: derivedText.horoscope_details.nakshatra,
          moon_sign: derivedText.horoscope_details.rashi,
          info: derivedText.horoscope_details.birth,
          manglik: derivedText.horoscope_details.manglik,
          score: derivedText.horoscope_details.score,
          link: derivedText.horoscope_details.link,
          is_gamified:
            derivedText.horoscope_details.astro_gamification && derivedText.horoscope_details.astro_gamification.is_astro_gamified
              ? derivedText.horoscope_details.astro_gamification.is_astro_gamified
              : false,
        },
      };
    }

    if (extra.trustBadge) {
      const { trustBadge } = extra;
      const data = {
        mobileVerified: (payload.contact && payload.contact.mobile_verified && payload.contact.mobile_verified === 'Y') || false,
      };
      state = {
        ...state,
        trustBadges: dataBuilder.trustBadges(trustBadge, data),
      };
    }

    // eslint-disable-next-line
    if (derivedText && derivedText.family_details) {
      state.family = {
        desc: derivedText.family_details.details,
      };
    }

    // eslint-disable-next-line
    if (derivedText && derivedText.matching_data) {
      state.commonInterests = Object.keys(derivedText.matching_data).map(k => derivedText.matching_data[k]);
    }

    if (score && score.partner && extra.preferences && extra.preferences.partner) {
      state.preferences = dataBuilder.preferences(score, extra);
    }

    return state;
  }
  return baseline;
};
