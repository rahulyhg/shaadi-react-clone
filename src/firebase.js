import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyA5HNpkMP-08iDnVeYC0-cijjB4ambtpq0',
  authDomain: 'fb.shaadi.com',
  projectId: 'shaadi-web-auth',
  messagingSenderId: '914832269012',
};

firebase.initializeApp(config);
export default firebase;
