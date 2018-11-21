export default (astro = {}) => {
  if (astro && astro.details) {
    if (astro.details.astro_status !== 'Astro Ready') {
      return false;
    }
    return true;
  }
  return false;
};
