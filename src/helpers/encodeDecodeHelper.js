export const encode64 = str => str && window.btoa(unescape(encodeURIComponent(str)));
export const decode64 = str => str && decodeURIComponent(escape(window.atob(str)));
