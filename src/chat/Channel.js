/* eslint no-underscore-dangle: 0 */
export default class Channel {
  constructor(socket, name) {
    this.name = name;
    this.socket = socket;
    this.handlers = {};
    this.on = this.on.bind(this);
    this.off = this.off.bind(this);
    this._fire = this._fire.bind(this);
  }

  on(event, fn) {
    this.handlers[event] = [...(this.handlers[event] || []), fn];
  }

  off(event, fn) {
    this.handlers[event] = (this.handlers[event] || []).filter(f => f !== fn);
  }

  _fire(event, payload) {
    this.handlers[event] = this.handlers[event] || [];
    this.socket._log(`fire<${this.name}>`, event, payload, `${this.handlers[event].length} callbacks`);
    this.handlers[event].map(fn => fn(payload));
  }
}
