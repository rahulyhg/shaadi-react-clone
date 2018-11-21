/* eslint-disable */
// Extracted from https://github.com/developit/unfetch

export default (url, _options) => {
  const options = _options || {};
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.open(options.method || 'get', url, true);

    for (let i in options.headers) {
      request.setRequestHeader(i, options.headers[i]);
    }

    request.withCredentials = options.credentials === 'include';

    request.onload = () => resolve(onResponse());

    request.onerror = reject;

    request.send(options.body);

    function onResponse() {
      const keys = [];
      const all = [];
      const headers = {};

      request.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, (_m, headerName, value) => {
        const key = headerName.toLowerCase();
        keys.push(key);
        all.push([key, value]);
        const header = headers[key];
        headers[key] = header ? `${header},${value}` : value;
      });

      return {
        ok: (request.status / 100 | 0) == 2, // 200-299
        status: request.status,
        statusText: request.statusText,
        url: request.responseURL,
        clone: onResponse,
        text: () => Promise.resolve(request.responseText),
        json: () => Promise.resolve(request.responseText).then(JSON.parse),
        blob: () => Promise.resolve(new Blob([request.response])),
        headers: {
          keys: () => keys,
          entries: () => all,
          get: n => headers[n.toLowerCase()],
          has: n => n.toLowerCase() in headers,
        }
      };
    }
  });
}
