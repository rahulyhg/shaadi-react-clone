export function handleFacebookSignIn(onSuccess, onError) {
  import(/* webpackChunkName: "firebase" */ '../firebase').then(({ default: firebase }) => {
    // removing the previous session if exist
    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
    }

    // initialize facebook auth provider
    const provider = new firebase.auth.FacebookAuthProvider();

    // add scopes to provider
    provider.addScope('public_profile');
    provider.addScope('user_friends');
    provider.addScope('user_relationships');
    provider.addScope('user_relationship_details');
    provider.addScope('user_birthday');
    provider.addScope('user_location');
    provider.addScope('user_photos');
    provider.addScope('user_about_me');
    provider.addScope('email');
    provider.addScope('user_education_history');
    provider.addScope('user_events');
    provider.addScope('user_hometown');
    provider.addScope('user_likes');
    provider.addScope('user_religion_politics');
    provider.addScope('user_status');
    provider.addScope('user_videos');
    provider.addScope('user_website');
    provider.addScope('user_work_history');
    console.log('DEBUG: FB sign-in', 'scope added', provider);

    return handleSignInCallback(firebase, provider, onSuccess, onError);
  });
}

export function getFacebookAccessToken(data) {
  const { accessToken } = data.credential || {};
  return accessToken;
}

const handleSignInCallback = (firebase, provider, onSuccess, onError) => {
  // init sign-in
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      if (onSuccess !== undefined) {
        onSuccess(JSON.parse(JSON.stringify(result)));
      }
      console.log('DEBUG: FB sign-in', 'signInWithPopup resolve', JSON.parse(JSON.stringify(result)));
    })
    .catch(error => {
      if (onError !== undefined) {
        onError(JSON.parse(JSON.stringify(error)));
      }
      console.log('DEBUG: FB sign-in', 'signInWithPopup reject', JSON.parse(JSON.stringify(error)));
    });
  return null;
};
