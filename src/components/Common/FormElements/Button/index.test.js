import React from 'react';
import { mount } from 'enzyme';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from './index';
import s from './styles';

describe('Button with wrapper', () => {
  const mountedComponent = mount(<Button>Test</Button>);
  it('should have an button', () => {
    expect(mountedComponent.find(s.InputButton)).toHaveLength(1);
  });
});

describe('Button without wrapper', () => {
  const mountedComponent = mount(<Button ignoreRoot>Test</Button>);
  it('should not have an button', () => {
    expect(mountedComponent.find(s.InputWrapper)).toHaveLength(0);
  });
});

describe('Button with loader', () => {
  const mountedComponent = mount(<Button loading>Test</Button>);
  it('should have an button', () => {
    expect(mountedComponent.find(CircularProgress)).toHaveLength(1);
  });
});
