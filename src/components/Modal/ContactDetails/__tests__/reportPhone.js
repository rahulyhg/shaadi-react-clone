/* eslint camelcase: 0 */
import React from 'react';
import { mount } from 'enzyme';
import ReportPhoneNo from '../reportPhoneNo';

const onReportMisuse = jest.fn();
const doProfileAction = jest.fn();

describe('Report Phone Case', () => {
  const reportPhoneProps = {
    onModalClose() {},
    doProfileAction,
    onReportMisuse,
    data: {
      uid: '12345',
    },
  };
  const reportPhoneWrapper = mount(<ReportPhoneNo {...reportPhoneProps} />);

  it('should have three reason for report phone', () => {
    expect(reportPhoneWrapper.find('form').find('input[type="radio"]').length).toBe(3);
  });

  it('simulate form submission', () => {
    expect(reportPhoneWrapper.find('form').length).toBe(1);
    expect(doProfileAction).not.toHaveBeenCalled();
    reportPhoneWrapper.find('form').simulate('submit');
    expect(doProfileAction).toHaveBeenCalled();
  });
});
