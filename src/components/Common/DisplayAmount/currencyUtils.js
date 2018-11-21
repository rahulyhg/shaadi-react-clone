const formatCurrency = (currency, amount, fractionAllowed) => {
  const currencySymbols = {
    USD: '$', // US Dollar
    GBP: '£', // British Pound Sterling
  };
  const symbolicCurrencyCode = {
    USD: 'US ',
    GBP: 'UK ',
  };

  const currencySym = currency !== 'INR' ? currencySymbols[currency] || `${currency} ` : '\u20B9';

  const currFormat = amount.toFixed(fractionAllowed).replace(/(\d)(?=(\d\d)+\d$)/gi, '$1,');
  return (symbolicCurrencyCode[currency] || '') + currencySym + currFormat;
};

export { formatCurrency };
