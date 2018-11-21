import format from 'date-fns/format';

const asTime = t => {
  const dt = new Date(t);
  const hours = dt.getHours();
  const minutes = dt.getMinutes();
  return `${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? `0${minutes}` : minutes}${hours >= 12 ? 'PM' : 'AM'}`;
};

const asDate = t => format(new Date(t), 'DD MMM YYYY');

const applySkewAndGroup = (items = [], skew = {}) => {
  const out = [];
  const filterItems = [];
  let lastDate = null;
  items
    .filter(k => {
      const messageId = k.messageId || '';
      const isPresent = filterItems.includes(messageId);
      if (messageId !== '') filterItems.push(messageId);
      return !isPresent;
    })
    .map(i => ({ ...i, t: i.t + (skew[i.source] || 0) }))
    .sort((a, b) => a.t - b.t)
    .forEach(m => {
      const last = out[out.length - 1];
      const toBeMerged = last && last.from === m.from && m.t >= last.t && m.t - last.t < 600 * 1000;
      const userChanged = !last || last.from !== m.from;
      let i = 0;
      if (toBeMerged) {
        i += 1;
        last.lines = [...last.lines, { key: m.messageId, body: m.body, t: m.t, status: m.status, time: asTime(m.t), index: i }];
        last.status = m.status;
        last.t = m.t;
        last.time = asTime(m.t);
      } else {
        i = 0;
        out.push({
          key: `group-${m.messageId}`,
          status: m.status,
          time: asTime(m.t),
          from: m.from,
          t: m.t,
          isSelf: m.isSelf,
          lines: [{ key: m.messageId, body: m.body, t: m.t, status: m.status, time: asTime(m.t), index: i }],
          date: asDate(m.t) === lastDate ? null : asDate(m.t),
          userChanged,
        });
        lastDate = asDate(m.t);
      }
    });
  return out;
};

export default applySkewAndGroup;
