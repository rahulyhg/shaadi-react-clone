import React from 'react';
import { mount } from 'enzyme';
import factory from './utils/factory';
import TextLink from '../textLink';

jest.mock('../../../Common/Link');

describe('Text Link', () => {
  const props = { ...factory.textLinkProps };
  describe('Text Link: For Payment Link', () => {
    const textLink = mount(<TextLink {...props} />);
    expect(
      textLink
        .find('TextLink')
        .find('#data_test_payment_link')
        .exists(),
    ).toBe(true);
    expect(
      textLink
        .find('TextLink')
        .find('#data_test_lock_icon')
        .exists(),
    ).toBe(true);
  });

  describe('Text Link: Without Name', () => {
    const textLinkProps = { ...props, name: '' };
    const textLink = mount(<TextLink {...textLinkProps} />);
    console.log(textLink.html());
    expect(textLink.html()).toEqual(null);
  });
});
