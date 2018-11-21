export default (preferences, astro) => {
  if (astro && astro.details) {
    if (astro.details.astro_status !== 'Astro Ready') {
      return 'none';
    }
  }
  if (preferences && preferences.privacy) {
    switch (preferences.privacy.horoscope_status) {
      case 'Show all':
      case 'Show All':
        return 'available';
      case 'When I Contact':
        return 'availableOnRequest';
      case 'Hidden':
        return 'locked';
      default:
        return 'none';
    }
  }
  return null;
};
