import React from 'react';
import { mount } from 'enzyme';
import YouAndMeConversationStarter from '../../YouAndMeConversationStarter';
import factory from './factory';
import s from '../styles';

describe('You & Her conversation starters', () => {
  it('Should be visible when conversation data is available', () => {
    const youAndMeConversationStarterProps = { ...factory.props };
    const youAndMeConversationStarter = mount(<YouAndMeConversationStarter {...youAndMeConversationStarterProps} />);
    expect(youAndMeConversationStarter.text()).toContain('You & Him');
    expect(youAndMeConversationStarter.text()).toContain('He is a vegetarian as well');
    expect(youAndMeConversationStarter.text()).toContain('He is a Gemini - you both share the "Air" zodiac element');
    expect(youAndMeConversationStarter.text()).toContain("You both have done your Bachelor's degree");
    expect(youAndMeConversationStarter.find(s.YouAndMeIcon).exists()).toBe(true);
  });
});
