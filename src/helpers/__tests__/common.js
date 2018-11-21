import { encode64, htmlDecode } from '../common';

describe('Tests for Common Utils  : ', () => {
  it('should render html entities in chat message properly', () => {
    const chatMessage = htmlDecode("How are you? I'll call you today.");
    expect(chatMessage).toContain(`How are you? I'll call you today.`);
  });

  it('should encode the input text', () => {
    const evt_ref = encode64('chat');
    expect(evt_ref).toContain(`Y2hhdA==`);
  });
});
