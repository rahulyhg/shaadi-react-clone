import profileDecorator from './factories/profile';
import profilesDecorator from './factories/profiles';

const times = x => f => {
  if (x > 0) {
    f(x);
    times(x - 1)(f);
  }
};

const profileKeys = [];
const profilesForKeys = {};

const userPhotos = [
  'https://images-na.ssl-images-amazon.com/images/M/MV5BMjA2NzA2NTMxNV5BMl5BanBnXkFtZTYwMjA1ODEy._V1_UY256_CR85,0,172,256_AL_.jpg',
  'https://images-na.ssl-images-amazon.com/images/M/MV5BY2NiOGIxY2EtNjI4MS00NWM2LTk5ZjAtMWE1NDlhODQ0Yzc3XkEyXkFqcGdeQXVyMjMxOTkwODk@._V1_UY256_CR46,0,172,256_AL_.jpg',
  'https://images-na.ssl-images-amazon.com/images/M/MV5BMjI4NjM1NDkyN15BMl5BanBnXkFtZTgwODgyNTY1MjE@._V1.._UX172_CR0,0,172,256_AL_.jpg',
  'https://images-na.ssl-images-amazon.com/images/M/MV5BMTczNTg5NTgwNF5BMl5BanBnXkFtZTgwMjQ4MTE2NDE@._V1_UY256_CR43,0,172,256_AL_.jpg',
  'https://images-na.ssl-images-amazon.com/images/M/MV5BMjUzZTJmZDItODRjYS00ZGRhLTg2NWQtOGE0YjJhNWVlMjNjXkEyXkFqcGdeQXVyMTg4NDI0NDM@._V1_UY256_CR42,0,172,256_AL_.jpg',
];

times(5)(x => {
  profilesForKeys[`uid-${x}`] = profileDecorator({
    uid: `uid-${x}`,
    name: `User ${x}`,
    fullPhoto: userPhotos[x - 1],
    summary: {
      shortBio: `Short Bio Sample ${x}`,
      profileCreatedBy: ['Parent', 'Sibling'][x % 2],
    },
  });
  profileKeys.push(`uid-${x}`);
});

const profiles = profilesDecorator(profilesForKeys);

const props = {
  location: {
    search:
      '?profileid=uid-1&pg_show_from=1&np=search-result&evt_ref=bWF0Y2hlcy1tb3N0X3ByZWZlcnJlZF91bnZpZXdlZA==&navigation=1&profileNumber=3&pg_searchresults_id=search:7d1e6bd678d4a16f1bf043346920d35c&datasrc=api&pg_ubt=L3NlYXJjaC9wYXJ0bmVyfHwyMA==&featured=N',
  },
  pagination: {
    prevUid: 'uid-2',
    nextUid: 'uid-3',
  },
  scrollTop: 0,
  profiles,
  item: {
    tooltip: {
      key: 'none',
    },
  },
  toast: {
    message: null,
  },
  history: {
    push: () => {},
  },
  windowWidth: 420,
  onProfileInit: () => {},
  fetchProfileByUid: () => {},
  doProfileAction: () => {},
};

export default props;
