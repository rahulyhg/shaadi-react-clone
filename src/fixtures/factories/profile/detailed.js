const album = props => ({
  items: [],
  ...props,
});

const conversationStarters = props => ({
  items: [
    {
      key: 1,
      icon: 'discover_connect',
      desc: 'You both are from Hindu community',
    },
    {
      key: 2,
      icon: 'discover_connect',
      desc: 'She lives in Mumbai too yo',
    },
    {
      key: 3,
      icon: 'discover_connect',
      desc: 'You both are graduates in MBA',
    },
  ],
  ...props,
});

const lifestyle = props => ({
  items: [
    {
      key: 1,
      icon: 'drinks',
      desc: "Doesn't Drink, Doesn't Smoke",
    },
    {
      key: 2,
      icon: 'veg',
      desc: 'Vegetarian',
    },
  ],
  ...props,
});

const family = props => ({
  title: 'His Family',
  desc: 'Sample Family Details Text',
  ...props,
});

const preferences = props => ({
  items: [
    {
      key: 1,
      term: 'Age',
      desc: '24 to 30',
      isMatch: true,
    },
    {
      key: 2,
      term: 'Maritial Status',
      desc: 'Never Married',
      isMatch: false,
    },
  ],
  matchCount: 1,
  ...props,
});

const background = props => ({
  title: 'Background',
  items: [
    {
      key: 1,
      icon: 'profile_community',
      desc: 'Khatri',
    },
    {
      key: 2,
      icon: 'profile_religion',
      desc: 'Sikh, Punjabi',
    },
  ],
  ...props,
});

const education = props => ({
  title: 'Education & Career',
  items: [
    {
      key: 1,
      icon: 'profession',
      desc: 'Sr. Manager with private company',
    },
    {
      key: 2,
      icon: 'edu_qualification',
      desc: 'Masters degree in Management',
    },
  ],
  ...props,
});

export default function detailed(props = {}) {
  return {
    ready: true,
    album: album(props.album),
    mLifestyle: lifestyle(props.lifestyle),
    family: family(props.family),
    preferences: preferences(props.preferences),
    mBackground: background(props.background),
    education: education(props.education),
    horoscope: education(props.education),
    conversationStarters: conversationStarters(props.conversationStarters),
    ...props,
  };
}
