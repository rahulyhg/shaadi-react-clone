export default (uid, { source, id_details, id_type, consent = 'Y' }) => {
  const data = {
    data: {
      consent,
      source,
    },
  };
  if (consent === 'Y') {
    if (id_type) {
      data.data.id_type = id_type;
      if (id_details) {
        data.data.id_details = id_details;
      }
    }
  }
  return {
    method: 'put',
    url: `/consents/${uid}`,
    data,
  };
};
