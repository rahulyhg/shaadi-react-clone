import React from 'react';
import { mount } from 'enzyme';
import CustomButton from '../../CustomButton';
import roundButtonFactory from './utils/roundButtonFactory';

describe('Connect Button Rendering', () => {
  it('Should render Free Connect Button', () => {
    const freeConnectButtonProps = { ...roundButtonFactory.freeConnect };
    const freeConnectButtonMount = mount(<CustomButton {...freeConnectButtonProps} />);
    expect(freeConnectButtonMount.html()).toContain('Connect Now');
    expect(freeConnectButtonMount.props().isVip).toBe(false);
    expect(freeConnectButtonMount.props().type).toBe('Connect');
    expect(freeConnectButtonMount.props().isPaidUser).toBe(false);
  });

  it('Should render Premium Connect Button', () => {
    const premiumConnectButtonProps = { ...roundButtonFactory.premiumConnect };
    const premiumConnectButtonMount = mount(<CustomButton {...premiumConnectButtonProps} />);
    expect(premiumConnectButtonMount.props().isPaidUser).toBe(true);
  });

  it('Should render VIP Connect Button', () => {
    const vipConnectButtonProps = { ...roundButtonFactory.vipConnect };
    const vipConnectButtonMount = mount(<CustomButton {...vipConnectButtonProps} />);
    expect(vipConnectButtonMount.props().isVip).toBe(true);
  });
});

describe('Accept Button Rendering', () => {
  it('Should render Accept Button', () => {
    const freeAcceptButtonProps = { ...roundButtonFactory.freePremiumAccept };
    const freeAcceptButtonMount = mount(<CustomButton {...freeAcceptButtonProps} />);
    expect(freeAcceptButtonMount.html()).toContain('Accept');
    expect(freeAcceptButtonMount.props().type).toBe('Accept');
    expect(freeAcceptButtonMount.props().isVip).toBe(false);
    expect(freeAcceptButtonMount.props().isPaidUser).toBe(false);
  });
});

describe('Decline Button Rendering', () => {
  it('Should render Decline Button', () => {
    const freeDeclineButtonProps = { ...roundButtonFactory.freePremiumDecline };
    const freeDeclineButtonMount = mount(<CustomButton {...freeDeclineButtonProps} />);
    expect(freeDeclineButtonMount.html()).toContain('Decline');
    expect(freeDeclineButtonMount.props().type).toBe('Decline');
    expect(freeDeclineButtonMount.props().isVip).toBe(false);
    expect(freeDeclineButtonMount.props().isPaidUser).toBe(false);
  });
});

describe('Write Message Button Rendering', () => {
  it('Should render Write Button', () => {
    const writeMessageButtonProps = { ...roundButtonFactory.writeMessage };
    const writeMessageButtonMount = mount(<CustomButton {...writeMessageButtonProps} />);
    expect(writeMessageButtonMount.html()).toContain('Write Message');
    expect(writeMessageButtonMount.props().type).toBe('WriteMessage');
  });
});
