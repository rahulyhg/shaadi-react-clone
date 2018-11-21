export default function flags(props = {}) {
  return {
    albumStatus: props.albumStatus || 'default',
    membershipLevel: props.membershipLevel || 'free',
    ...props,
  };
}
