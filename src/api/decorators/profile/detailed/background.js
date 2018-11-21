import { strnorm } from '../../utils';

export default payload => {
  const { doctrine, location, origin, interests_and_more } = payload;
  let subCaste = '';

  const doctrineCaste = doctrine.caste !== doctrine.religion ? doctrine.caste : '';

  const casteAndSubCaste = doctrineCaste !== '' ? ', ' : '';

  const doctrineZakaat = doctrine.zakaat === 'Yes' ? `practises Zakat` : "doesn't practise Zakat";
  const doctrineFast = doctrine.fasting === 'Yes' ? `fasts on Ramadan` : "doesn't fast on Ramadan";
  const muslimFast =
    doctrine.fasting !== ''
      ? doctrine.namaaz !== '' ? `, ${doctrineFast}` : doctrineFast.charAt(0).toUpperCase() + doctrineFast.slice(1).toLowerCase()
      : '';
  const muslimZakaat =
    doctrine.zakaat !== ''
      ? doctrine.namaaz !== '' || doctrine.fasting !== ''
        ? `, ${doctrineZakaat}`
        : doctrineZakaat.charAt(0).toUpperCase() + doctrineZakaat.slice(1).toLowerCase()
      : '';

  const ignoreValArr = ['-', 'null', '', null, 0, undefined, 'undefined'];

  if (strnorm(doctrine.sub_caste, 1)) {
    subCaste = `${casteAndSubCaste + strnorm(doctrine.sub_caste, 1)}`;
  }

  const state = [
    {
      key: 'background-item-0',
      icon: 'profile_religion',
      desc: `${doctrine.religion}, ${doctrine.mother_tongue}`,
      title: 'Religion',
    },
    {
      key: 'background-item-1',
      icon: 'profile_community',
      desc: `${doctrineCaste}${subCaste}`,
      title: 'Community',
    },
  ];

  const gotra = strnorm(doctrine.gotra, 1);

  if (!['Others', '-', null, "Don't know", ''].includes(gotra)) {
    state.push({
      key: 'background-item-2',
      icon: 'profile_gotra',
      desc: `Belongs to ${doctrine.gotra} gothra`,
    });
  }

  if (doctrine.religion === 'Muslim' && (doctrine.namaaz !== '' || muslimFast !== '' || muslimZakaat !== '')) {
    state.push({
      key: 'background-item-3',
      icon: 'namaz_zhakat',
      desc: `${doctrine.namaaz !== '' ? `Offers Namaz ${doctrine.namaaz.toLowerCase()}` : ''}${muslimFast}${muslimZakaat}`,
      tooltip: `${
        doctrine.zakaat !== ''
          ? "Zakaat is one of the Five Pillars of Islam. Practicing zakaat is considered a means of purifying one's wealth and one's soul."
          : ''
      }`,
    });
  }

  if (doctrine.religion === 'Sikh' && (doctrine.dastar !== '' || doctrine.keshdhari !== '')) {
    state.push({
      key: 'background-item-3',
      icon: 'dastar_keshdhari',
      desc: `${
        doctrine.dastar !== '' ? (doctrine.dastar === 'Yes' ? `Wears a Pagg/Dastar (turban)` : "Doesn't wear a Pagg/Dastar (turban)") : ''
      } ${doctrine.keshdhari !== '' ? (doctrine.keshdhari === 'Yes' ? `Is a Keshdhari Sikh` : 'Is not a Keshdhari Sikh') : ''}`,
      tooltip: `${
        doctrine.dastar !== ''
          ? 'The Sikh turban, more appropriately known as a dastar is an article of faith worn by Sikhs.'
          : 'Keshdharies are Sikhs who do not trim or remove hair, as they believe in maintaining a natural way of life.'
      }`,
    });
  }

  const indianishCountries = ['India', 'Afghanistan', 'Bangladesh', 'Bhutan', 'Maldives', 'Nepal', 'Pakistan', 'Sri Lanka'];
  const isNri = !indianishCountries.includes(location.country);

  state.push({
    key: 'background-item-4',
    icon: 'profile_living_in',
    desc: `Lives in ${location.city && !ignoreValArr.includes(location.city) ? `${location.city}, ` : ''}${
      location.state && !ignoreValArr.includes(location.state) ? `${location.state}, ` : ''
    }${location.country} ${
      isNri === true && location.residency_status !== '' && !ignoreValArr.includes(location.residency_status)
        ? ` (${location.residency_status})`
        : ''
    }`,
  });

  const canSpeak = interests_and_more.can_speak.join(', ');

  if (isNri === true) {
    state.push({
      key: 'background-item-5',
      icon: 'born_brought_up',
      desc: `Grew up in ${origin.grewup_in.join(', ')}${origin.ethnicity !== '' ? `, ${origin.ethnicity} ethnic origin` : ''}`,
    });
  }

  if (canSpeak && !['null', 'Will tell you later'].includes(canSpeak)) {
    state.push({
      key: 'background-item-canSpeak',
      icon: 'known_language',
      desc: `Can Speak ${canSpeak}`,
    });
  }

  return state;
};
