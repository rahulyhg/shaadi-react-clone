function ordinalPostfix(i) {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return 'st';
  }
  if (j === 2 && k !== 12) {
    return 'nd';
  }
  if (j === 3 && k !== 13) {
    return 'rd';
  }
  return 'th';
}

const getPaddedValue = value => (value.length === 1 ? `0${value}` : value);

export default (epoch, format) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const monthNames3Letter = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(epoch * 1000);
  const D = date.getDate().toString();
  const o = ordinalPostfix(D);
  const M = (date.getMonth() + 1).toString();
  const Y = date.getFullYear().toString();
  const s = date.getSeconds().toString();
  const m = date.getMinutes().toString();
  const H = date.getHours().toString();
  const YY = Y % 100;
  const DD = getPaddedValue(D);
  const MM = getPaddedValue(M);
  const MMM = monthNames3Letter[M - 1];
  const MMMM = monthNames[M - 1];
  const HH = getPaddedValue(H);
  const h = H > 12 ? H - 12 : H;
  const hh = getPaddedValue(h.toString());
  const A = H > 12 ? 'PM' : 'AM';
  const a = A.toLowerCase();
  const mm = getPaddedValue(m);
  const ss = getPaddedValue(s);
  const formatted = format
    .replace('A', A)
    .replace('a', a)
    .replace('ss', ss)
    .replace('s', s)
    .replace('mm', mm)
    .replace('m', m)
    .replace('HH', HH)
    .replace('H', H)
    .replace('hh', hh)
    .replace('h', h)
    .replace('DD', DD)
    .replace('D', D)
    .replace('o', o)
    .replace('YYYY', Y)
    .replace('YY', YY)
    .replace('Y', Y)
    .replace('MMMM', MMMM)
    .replace('MMM', MMM)
    .replace('MM', MM)
    .replace(/((?!(A|P|a|p|)).|^)M([^ar])*/, M);
  return formatted;
};
