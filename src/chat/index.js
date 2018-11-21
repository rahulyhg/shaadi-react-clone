/* eslint no-underscore-dangle: 0 */
import StropheConnection from './StropheConnection';
import Channel from './Channel';
import Logger from './Logger';

export default class Chat {
  constructor(appKey, { auth }) {
    this.appKey = appKey;
    this.auth = auth;
    this.strophe = new StropheConnection(this, auth);
    this.reconnectDelay = 512;

    this.connect = this.connect.bind(this);
    this.reconnect = this.reconnect.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.sendTypingIndication = this.sendTypingIndication.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.countdown = this.countdown.bind(this);
    this._init();
  }

  connect() {
    this._log(' (connect) ');
    this.strophe.connect();
  }

  reconnect() {
    this.reconnectDelay = this.reconnectDelay >= 6000 ? 60000 : this.reconnectDelay * 2;
    this.strophe.disconnect();
    this.strophe = new StropheConnection(this, this.auth);
    this._log(` (reconnect) in ${this.reconnectDelay / 1000}s `);
    this.countdown(this.reconnectDelay);
  }

  countdown(t) {
    const secs = Math.floor(t / 1000) - 3;
    if (secs >= 10) {
      this._fire('disconnected', `Not connected. Trying in ${secs}s...`);
      const step = secs >= 25 ? 10 : 5;
      const delay = secs % step === 0 ? step * 1000 : 1000 * (secs % step);
      setTimeout(() => this.countdown(t - delay), delay);
    } else if (secs > 0) {
      this._fire('disconnected', `Not connected. Trying in ${secs}s...`);
      setTimeout(() => this.countdown(t - 1000), 1000);
    } else {
      this._fire('disconnected', 'connecting...');
      setTimeout(this.connect, t);
    }
  }

  subscribe(channelName) {
    if (this.channels[channelName]) {
      return this.channels[channelName];
    }
    this._log(`(channel subscription) [WARNING] Unknown channel ${channelName}`);
    const channel = new Channel(this, channelName);
    this.channels[channelName] = channel;
    return channel;
  }

  channel(channelName) {
    return this.channels[channelName];
  }

  sendPresence(status) {
    return this.strophe.sendPresence(status);
  }

  sendReceipt(uid, messageIds, status) {
    return this.strophe.sendReceipt(uid, messageIds, status);
  }

  sendTypingIndication(uid, isTyping) {
    return this.strophe.sendTypingIndication(uid, isTyping);
  }

  sendMessage(uid, message, messageId, t) {
    return this.strophe.sendMessage(uid, message, messageId, t);
  }

  // Supported events

  _onConnected() {
    this._fire('connected');
  }

  _onMessage(obj) {
    this.privateChannel._fire('message', obj);
  }

  _onPresence(obj) {
    this.privateChannel._fire('presence', obj.status);
  }

  _onConnecting() {
    this._fire('connecting');
  }

  _onConnfail() {
    this._log('Strophe connfail');
    this.reconnect();
  }

  _onAuthfail() {
    this._log('Strophe authfail');
    this.reconnect();
  }

  _onDisconnected() {
    this._log('Strophe disconnected');
    this.reconnect();
  }

  _init() {
    this.logger = new Logger('<<<<<Chat Socket>>>>', true);
    this.channels = {};
    this._log = this.logger.log.bind(this.logger);
    this.privateChannel = this.subscribe(`private/${this.auth.uid}`);
    this.socketChannel = this.subscribe(`socket/${this.auth.nonce}`);
    this.on = this.socketChannel.on.bind(this.socketChannel);
    this.off = this.socketChannel.off.bind(this.socketChannel);
    this._fire = this.socketChannel._fire.bind(this.socketChannel);
  }
}
