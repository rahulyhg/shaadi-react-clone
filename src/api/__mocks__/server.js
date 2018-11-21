/* eslint import/no-extraneous-dependencies: 0 */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const server = axios.create({
  baseURL: 'http://test.shaadi.com/api',
});
const mock = new MockAdapter(server);

server.mock = mock;
server.mockAt = new Date() / 1;

export default server;
