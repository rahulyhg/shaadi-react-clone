export default function presence(props = {}) {
  return {
    lastOnlineDetails: props.lastOnlineDetails || 'Online Now',
    ...props,
  };
}
