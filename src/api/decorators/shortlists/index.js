const baseListItem = {
  id: 0,
  name: '',
};

export default function(base = [], payload = {}) {
  return (payload.lists || []).map(item => ({
    ...baseListItem,
    id: item.listid,
    name: item.list_name,
  }));
}
