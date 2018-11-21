import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createReducer from './reducers';

// Responsible for creating the redux store–and any associated work like middleware.
//
// The ideas here and in createReducer are directly from Dan:
// https://stackoverflow.com/a/33044701
// The difference is in how I inject reducers using withReducer()
const initializeStore = () => {
  // createStore returns a plain object so we'll mess with it after creation.
  const store = createStore(
    // See rootReducer.createReducer for more info on this. Calling it without
    // a param creates a reducer with whatever is in rootReducer.
    createReducer(),
    composeWithDevTools(applyMiddleware(thunk)),
  );

  // Create an object for any later reducers
  store.asyncReducers = {};

  // Creates a convenient method for adding reducers later
  // See withReducer.js for this in use.
  store.injectReducer = (key, reducer) => {
    // Updates the aysncReducers object. This ensures we don't remove any old
    // reducers when adding new ones.
    store.asyncReducers[key] = reducer;
    // This is the key part: replaceReducer updates the reducer
    // See rootReducer.createReducer for more details, but it returns a function.
    store.replaceReducer(createReducer(store.asyncReducers));
    return store;
  };

  return store;
};

export function createStorageListener(reduxStore) {
  return event => {
    if (event.key === 'sh-eoi') {
      if (event.newValue) {
        const { data } = JSON.parse(event.newValue) || {};
        data && reduxStore.dispatch(JSON.parse(data));
      }
    }
  };
}

export default initializeStore;
