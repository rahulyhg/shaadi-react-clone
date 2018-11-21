import React from 'react';
import { mount } from 'enzyme';
import Stepper from './index';
import s from './styles';

jest.mock('../../Link');

describe('Stepper on first step having no step completed', () => {
  it('should first stepper active', () => {
    const mountedComponent = mount(<Stepper completedStepNumber={2} isActiveStep={0} />);
    expect(
      mountedComponent
        .find(s.stepperLi)
        .at(0)
        .props().status,
    ).toEqual('isCurrentActive');
  });
});

describe('Stepper on second step having first step completed', () => {
  it('should first stepper active', () => {
    const mountedComponent = mount(<Stepper isActiveStep={2} completedStepNumber={1} />);
    expect(
      mountedComponent
        .find(s.stepperLi)
        .at(1)
        .props().status,
    ).toEqual('isActive');
  });
});

describe('Stepper on first step having no step completed', () => {
  it('should first stepper active', () => {
    const mountedComponent = mount(<Stepper isActiveStep={3} completedStepNumber={2} />);
    expect(
      mountedComponent
        .find(s.stepperLi)
        .at(2)
        .props().status,
    ).toEqual('isActive');
  });
});

describe('Stepper on first step having no step completed', () => {
  it('should first stepper active', () => {
    const mountedComponent = mount(<Stepper isActiveStep={4} completedStepNumber={3} />);
    expect(
      mountedComponent
        .find(s.stepperLi)
        .at(3)
        .props().status,
    ).toEqual('isActive');
  });
});
