import profile from './profile';

export default function profiles(props = {}) {
  return {
    default: profile({ uid: 'default' }),
    self: profile({ uid: 'self' }),
    ...props,
  };
}
