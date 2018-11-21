const upgradeModal = props => ({
  name: 'User 1',
  photo: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjA2NzA2NTMxNV5BMl5BanBnXkFtZTYwMjA1ODEy._V1_UY256_CR85,0,172,256_AL_.jpg',
  ...props,
});

const commonInterests = props => ({
  items: [{ desc: 'You both speak Hindi' }, { desc: 'He enjoys hard rock as well' }, { desc: 'He enjoys fast food too' }],
  himHer: 'Her',
  ...props,
});

const viewContactConfirm = props => ({
  display_name: 'Sample User Name',
  ...props,
});

const viewContact = props => ({
  email: 'samurai.guitar@gmail.com',
  contactPerson: 'Later L (Parent/Guardian)',
  contactsAvailable: '142 of 275',
  mobileStatus: 'hidden',
  mobile: '+xx xxx xxx xxxx',
  settings: {
    contactsRemaining: 200,
    contactsTotal: 500,
  },
  ...props,
});

const albumModal = props => ({
  album: [
    'https://images-na.ssl-images-amazon.com/images/M/MV5BMjA2NzA2NTMxNV5BMl5BanBnXkFtZTYwMjA1ODEy._V1_UY256_CR85,0,172,256_AL_.jpg',
    'https://images-na.ssl-images-amazon.com/images/M/MV5BY2NiOGIxY2EtNjI4MS00NWM2LTk5ZjAtMWE1NDlhODQ0Yzc3XkEyXkFqcGdeQXVyMjMxOTkwODk@._V1_UY256_CR46,0,172,256_AL_.jpg',
    'https://images-na.ssl-images-amazon.com/images/M/MV5BMjI4NjM1NDkyN15BMl5BanBnXkFtZTgwODgyNTY1MjE@._V1.._UX172_CR0,0,172,256_AL_.jpg',
    'https://images-na.ssl-images-amazon.com/images/M/MV5BMTczNTg5NTgwNF5BMl5BanBnXkFtZTgwMjQ4MTE2NDE@._V1_UY256_CR43,0,172,256_AL_.jpg',
    'https://images-na.ssl-images-amazon.com/images/M/MV5BMjUzZTJmZDItODRjYS00ZGRhLTg2NWQtOGE0YjJhNWVlMjNjXkEyXkFqcGdeQXVyMTg4NDI0NDM@._V1_UY256_CR42,0,172,256_AL_.jpg',
  ],
  isConnectBtnVisible: false,
  ...props,
});

export default function modal(props = {}) {
  return {
    template: props.template || 'none',
    fullScreen: false,
    upgradeModal: upgradeModal(props.upgradeModal),
    commonInterests: commonInterests(props.commonInterests),
    viewContactConfirm: viewContactConfirm(props.viewContactConfirm),
    contactDetails: viewContact(props.viewContact),
    album: albumModal(props.albumModal),
    settings: {
      contactsRemaining: 200,
      contactsTotal: 500,
    },
    ...props,
  };
}
