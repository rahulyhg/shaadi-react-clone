import React from 'react';
import { mount } from 'enzyme';
import VerificationShield from '../../VerificationShield';
import factory from './utils/factory';
import s from '../styles';

describe('VerificationShield', () => {
  it('Should be visible when sheild state available', () => {
    const verification = { ...factory.props.verification };
    const verificationProps = { ...factory.props, verification };
    const sheildWrapper = mount(<VerificationShield {...verificationProps} />);
    expect(sheildWrapper.find(s.ShieldIcon).exists()).toBe(true);
  });
});
