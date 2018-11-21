import routes from '../api/routes';

export const stubRoute = (apiPath, method = 'get') => {
  const originalHandler = routes[method][apiPath];
  return {
    onRequest: (callback, isPublic = true) => {
      callback.isPublic = isPublic;
      routes[method][apiPath] = callback;
    },
    clear: () => {
      routes[method][apiPath] = originalHandler;
    },
  };
};

// JSDOM Issue (jsom doesn't allow changing location.href)
//  - https://github.com/jsdom/jsdom#reconfiguring-the-jsdom-with-reconfiguresettings
//  - https://github.com/facebook/jest/issues/890
export const setUrlPathname = pathname => {
  Object.defineProperty(window.location, 'href', {
    writable: true,
    value: `http://localhost/${pathname}`,
  });
  Object.defineProperty(window.location, 'pathname', {
    writable: true,
    value: pathname,
  });
};
