const baseValue = {
  app_language: 'en-Us',
};

export default function(base = baseValue, payload = {}) {
  const { display_settings } = payload;
  return {
    ...base,
    app_language: display_settings.language,
  };
}
