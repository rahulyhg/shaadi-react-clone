import profileDecorator from './factories/profile';
import profilesDecorator from './factories/profiles';

const times = x => f => {
  if (x > 0) {
    f(x);
    times(x - 1)(f);
  }
};

const results = { items: [] };
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
    tempId: 'tempId',
    name: `User ${x}`,
    fullPhoto: userPhotos[x - 1],
    summary: {
      shortBio: `Short Bio Sample ${x}`,
      profileCreatedBy: ['Parent', 'Sibling'][x % 2],
    },
  });
  results.items.push({ uid: `uid-${x}` });
});

const profiles = profilesDecorator(profilesForKeys);

const props = {
  results,
  profiles,
  classes: {},
  location: {
    pathname: '/search/partner?pg_searchresults_id=search%3Ab16d055fb7d2196df5a5c58e71aaa631&vtype=list&spn=list',
    search: '?pg_searchresults_id=search%3Ab16d055fb7d2196df5a5c58e71aaa631&vtype=list&spn=list',
  },
  toast: { message: null },
  doPreferredSearch: () => {},
  doProfileAction: () => {},
};

export default props;
