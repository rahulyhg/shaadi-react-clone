import cookie from 'cookie';

const cookies = cookie.parse(document.cookie);

const cache = {
  uid: cookies.abclogin || '',
};

export default cache;
