const getTopBanksCodes = isJusPay => {
  if (isJusPay) {
    return ['NB_SBI', 'NB_HDFC', 'NB_ICICI', 'NB_AXIS', 'NB_IDBI', 'NB_KOTAK', 'NB_PNB', 'NB_UBI', 'NB_BOB', 'NB_IOB'];
  }
  return ['SBI', 'HDF', 'ICI', 'UTI', 'IDB', '162', 'PNB', 'UBI', 'BBR', 'IOB'];
};

export { getTopBanksCodes };
