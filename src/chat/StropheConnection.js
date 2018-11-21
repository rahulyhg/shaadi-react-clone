/* eslint no-underscore-dangle: 0 */
/* global window */
import { Strophe, $pres, $msg, $iq } from 'strophe.js';
import getUnixToFormat from '../helpers/getUnixToFormat';
import getSecondsDiffCalendar from '../helpers/getSecondsDiffCalendar';
import getAnyFormatToDateTime from '../helpers/getAnyFormatToDateTime';
import dateTimeFormat from '../constants/formats/dateTime';

// @todo more the following util function to independent util function
const dateObj = t => getAnyFormatToDateTime(`${t}`, dateTimeFormat.apiResp);
const secs = t => dateObj(t).getEpoch();
const midnightRoundedEpoch = t => {
  const date = dateObj(t);
  date.setHours(0, 0, 0, 0);
  return date.getTime() / 1000;
};
const asRawTime = t =>
  getSecondsDiffCalendar(midnightRoundedEpoch(t), {
    sameDay: 'h:mmA',
    lastDay: 'h:mmA',
    lastWeek: 'h:mmA',
    sameElse: 'h:mmA',
    nextDay: 'h:mmA',
    nextWeek: 'h:mmA',
  });
const asTimestamp = t => getUnixToFormat(secs(t), dateTimeFormat.apiResp);

const BOSH_DOMAIN = 'https://cha.shaadi.com/http-bind/';

export default class StropheConnection {
  constructor(socket, auth) {
    this.socket = socket;
    this.auth = auth;
    this.beforeSendSkew = 0;
    this.serverNow = this.serverNow.bind(this);
  }

  connect() {
    this.connection = new Strophe.Connection(BOSH_DOMAIN);
    const resource = `${this.auth.accessToken}-${this.auth.device}-${this.auth.nonce}`;
    const username = `${this.auth.uid}@cha.shaadi.com/${resource}`;
    const password = this.auth.uid;
    this.connection.connect(username, password, this.onConnect.bind(this));
    this.errorHandler = this.errorHandler.bind(this);
    this.messageHandler = this.messageHandler.bind(this);
    return this.connection;
  }

  isConnected() {
    return this.connection && this.connection.connected && this.connection.authenticated;
  }

  disconnect() {
    this.connection.flush();
    this.connection.reset();
  }

  connection() {
    return this.connection;
  }

  errorHandler(...args) {
    console.log(this.auth, 'TO DO Strophe error handler got', ...args);
    return true;
  }

  serverNow(t = 0) {
    return (new Date() / 1) - this.beforeSendSkew - t; // eslint-disable-line prettier/prettier
  }

  sendReceipt(uid, messageId, status) {
    if (!['read', 'delivered'].includes(status)) {
      Promise.reject(`Bad status: ${status}`);
      return false;
    }
    const t = this.serverNow();
    const from = Strophe.getBareJidFromJid(`${this.auth.uid}@cha.shaadi.com`.toLowerCase());
    const to = Strophe.getBareJidFromJid(`${uid}@cha.shaadi.com`.toLowerCase());
    let reply = $msg({ to, from, type: 'chat', id: messageId });
    reply = reply.c('active', { xmlns: 'http://jabber.org/protocol/chatstates' }).up();
    reply = reply.c('clientData', { xmlns: 'jabber:clientevent' });
    reply = reply
      .c('ver')
      .t('1.0')
      .up();
    reply = reply
      .c('token')
      .t(this.auth.accessToken)
      .up();
    reply = reply
      .c(status)
      .t('')
      .up();
    reply = reply
      .c('deviceId')
      .t('web')
      .up();
    reply = reply
      .c('ts')
      .t(asTimestamp(t))
      .up();
    reply = reply
      .c('senderID')
      .t(this.auth.uid)
      .up();
    reply = reply
      .c('receiverID')
      .t(uid)
      .up();
    if (this.isConnected()) {
      this.socket._log('Sending receipt', reply);
      this.connection.send(reply);
      return true;
    }
    this.socket._fire('error', 'Receipt attempted when not connected');
    return false;
  }

  sendTypingIndication(uid, isTyping) {
    const t = this.serverNow();
    const notify = isTyping ? 'composing' : 'composingCancel';
    const from = Strophe.getBareJidFromJid(`${this.auth.uid}@cha.shaadi.com`.toLowerCase());
    const to = Strophe.getBareJidFromJid(`${uid}@cha.shaadi.com`.toLowerCase());
    let reply = $msg({ to, from, type: 'chat' });
    reply = reply.c('clientData', { xmlns: 'jabber:clientevent' });
    reply = reply
      .c('ver')
      .t('1.0')
      .up();
    reply = reply.c(notify).up();
    reply = reply
      .c('deviceId')
      .t('web')
      .up();
    reply = reply
      .c('ts')
      .t(asTimestamp(t))
      .up();
    reply = reply
      .c('senderID')
      .t(this.auth.uid)
      .up();
    reply = reply
      .c('receiverID')
      .t(uid)
      .up();
    reply = reply
      .c('token')
      .t(this.auth.accessToken)
      .up();
    if (this.isConnected()) {
      this.socket._log('Sending message', reply);
      this.connection.send(reply);
      return true;
    }
    this.socket._fire('error', 'Message send attempted when not connected');
    return false;
  }

  sendMessage(uid, message, messageId, msecsAgo) {
    const t = this.serverNow(msecsAgo);
    const from = Strophe.getBareJidFromJid(`${this.auth.uid}@cha.shaadi.com`.toLowerCase());
    const to = Strophe.getBareJidFromJid(`${uid}@cha.shaadi.com`.toLowerCase());
    let reply = $msg({ to, from, type: 'chat', id: messageId });
    reply = reply.cnode(Strophe.xmlElement('body', message)).up();
    reply = reply.c('active', { xmlns: 'http://jabber.org/protocol/chatstates' }).up();
    reply = reply.c('clientData', { xmlns: 'jabber:clientevent' });
    reply = reply
      .c('deviceId')
      .t('web')
      .up();
    reply = reply
      .c('ts')
      .t(asTimestamp(t))
      .up();
    reply = reply
      .c('senderID')
      .t(this.auth.uid)
      .up();
    reply = reply
      .c('receiverID')
      .t(uid)
      .up();
    reply = reply
      .c('token')
      .t(this.auth.accessToken)
      .up();
    reply = reply
      .c('ver')
      .t('1.0')
      .up();

    if (this.isConnected()) {
      this.socket._log('Sending message', reply);
      this.connection.send(reply);
      return true;
    }
    this.socket._fire('error', 'Message send attempted when not connected');
    return false;
  }

  sendPresence(status) {
    let presence = $pres({ priority: 1 });
    presence = presence
      .c('status')
      .t(status)
      .up();
    presence = presence.c('clientData', { xmlns: 'jabber:clientevent' });
    presence = presence
      .c('ver')
      .t('1.0')
      .up();
    presence = presence
      .c('token')
      .t(this.auth.accessToken)
      .up();
    presence = presence
      .c('deviceId')
      .t('web')
      .up();
    presence = presence
      .c('senderID')
      .t(this.auth.uid)
      .up();
    presence = presence
      .c('receiverID')
      .t('')
      .up();

    if (this.isConnected()) {
      this.connection.send(presence);
      this.sendStropheIq();
      this.socket._onPresence({ status });
      return true;
    }
    this.socket._fire('error', 'Presence notification attempted when not connected');
    return false;
  }

  sendStropheIq() {
    const payload = $iq({
      from: `${this.auth.uid}@cha.shaadi.com`,
      to: 'cha.shaadi.com',
      type: 'get',
      id: 'synchronize',
    }).c('query', { xmlns: 'shaadi:xmpp:synchronize' });
    this.connection.sendIQ(payload, msg => {
      const serverTS = msg.getElementsByTagName('serverTS');
      if (serverTS.length > 0) {
        const t = parseInt(serverTS[0].childNodes[0].nodeValue, 10) * 1000;
        this.beforeSendSkew = (new Date() / 1) - t; // eslint-disable-line prettier/prettier
        this.socket._onMessage({ status: 'serverDelay', addToServer: this.beforeSendSkew });
      }
      this.socket._log('response from iq', msg);
      return true;
    });
  }

  messageHandler(msg) {
    window.msg = msg;
    const payload = {};
    payload.t = new Date() / 1;
    payload.time = asRawTime(payload.t);
    payload.from = msg.getElementsByTagName('senderID')[0].childNodes[0].nodeValue;
    payload.to = msg.getElementsByTagName('receiverID')[0].childNodes[0].nodeValue;
    payload.messageId = msg.getAttribute('id');

    const type = msg.getAttribute('type');
    const body = msg.getElementsByTagName('body');
    const ret = msg.getElementsByTagName('return');
    const delivered = msg.getElementsByTagName('delivered');
    const read = msg.getElementsByTagName('read');
    const composing = msg.getElementsByTagName('composing');
    const composingCancel = msg.getElementsByTagName('composingCancel');
    const paused = msg.getElementsByTagName('paused');
    const serverTS = msg.getElementsByTagName('serverTS');

    const chatCode = msg.getElementsByTagName('chatCode');

    if (serverTS.length > 0) {
      const t = parseInt(serverTS[0].childNodes[0].nodeValue, 10) * 1000;
      this.beforeSendSkew = (new Date() / 1) - t; // eslint-disable-line prettier/prettier
      this.socket._onMessage({ status: 'serverDelay', addToServer: this.beforeSendSkew });
    }

    if (composing.length > 0) {
      payload.status = 'beganTyping';
    } else if (composingCancel.length > 0) {
      payload.status = 'endedTyping';
    } else if (paused.length > 0) {
      payload.status = 'pausedTyping';
    } else if (ret.length > 0) {
      payload.status = 'selfMessage';
      payload.body = Strophe.getText(ret[0]);
      const swap = payload.to;
      payload.to = payload.from;
      payload.from = swap;
    } else if (delivered.length > 0) {
      payload.status = 'delivered';
    } else if (read.length > 0) {
      payload.status = 'read';
    } else if (type === 'chat' && body.length > 0) {
      payload.status = 'newMessage';
      payload.body = Strophe.getText(body[0]);
    }

    if (chatCode.length > 0) {
      this.socket._onMessage({ ...payload, status: 'chatCode', chatCode });
    }

    this.socket._onMessage(payload);

    // Strophe docs: The handler should return true if it is to be invoked again; returning false will remove the handler after it returns.
    return true;
  }

  onConnect(status) {
    this.connection.addHandler(this.errorHandler, null, 'message', 'error', null, null);
    switch (status) {
      case Strophe.Status.CONNECTING:
        this.socket._onConnecting();
        break;
      case Strophe.Status.CONNECTED:
        this.socket._onConnected();
        this.connection.addHandler(this.messageHandler, null, 'message', null, null, null);
        break;
      case Strophe.Status.DISCONNECTED:
        this.socket._onDisconnected();
        break;
      case Strophe.Status.CONNFAIL:
        this.socket._onConnfail();
        break;
      case Strophe.Status.AUTHFAIL:
        this.socket._onAuthfail();
        break;
      default:
        break;
    }
  }
}
