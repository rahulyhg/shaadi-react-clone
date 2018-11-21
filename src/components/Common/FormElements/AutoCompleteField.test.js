import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import { mount } from 'enzyme';
import CircularProgress from '@material-ui/core/CircularProgress';
import AutoCompleteField from './AutoCompleteField';
import Arrow from './Arrow';
import Wrapper from '../../../theme/Wrapper';

describe('AutoComplete Field with label', () => {
  const component = mount(<AutoCompleteField name="test" label="this is a label" />);
  it('should have an input label', () => {
    expect(component.find('label').exists()).toBeTruthy();
  });
});

describe('AutoComplete Field with spinner', () => {
  const component = mount(<AutoCompleteField name="test" isLoading />);
  it('should show loading spinner', () => {
    expect(component.find(CircularProgress).exists()).toBeTruthy();
  });
  it('should not show arrow', () => {
    expect(component.find(Arrow).exists()).toBeFalsy();
  });
});

describe('AutoComplete Field with arrow', () => {
  const component = mount(<AutoCompleteField name="test" />);
  it('should show arrow', () => {
    expect(component.find(Arrow).exists()).toBeTruthy();
  });
  it('should not show loading spinner', () => {
    expect(component.find(CircularProgress).exists()).toBeFalsy();
  });
});

describe('AutoComplete Field on focus with value and options from API', () => {
  const sampleOptions = [{ label: 'Mumbai' }, { label: 'Udaipur' }, { label: 'Akola' }];
  const component = mount(<AutoCompleteField name="test" options={sampleOptions} />);
  component.find('input[name="test"]').simulate('focus');
  it('should show options', () => {
    expect(component.find(Wrapper).exists()).toBeTruthy();
  });
});

describe('AutoComplete Field on focus with value less than required minium length', () => {
  const component = mount(<AutoCompleteField name="test" minLength={5} />);
  component.find('input[name="test"]').simulate('focus');
  component.find('input[name="test"]').simulate('change', { target: { value: 'test' } });
  component.find('input[name="test"]').simulate('blur');
  it('should show error', () => {
    expect(component.find(FormHelperText).exists()).toBeTruthy();
    expect(component.find(FormHelperText).props('error')).toBeTruthy();
  });
});
