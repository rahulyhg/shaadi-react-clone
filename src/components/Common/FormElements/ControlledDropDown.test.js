import React from 'react';
import { mount } from 'enzyme';
import ControlledDropDown from './ControlledDropDown';

const onOptionSelection = jest.fn();
const setInputState = (newState, afterSetState) => afterSetState();
const focusOut = jest.fn();
const sampleOptions = [{ label: 'Udaipur', value: 'Udaipur' }, { label: 'Mumbai', value: 'Mumbai' }, { label: 'Akola', value: 'Akola' }];
const props = {
  hasError() {},
  focus() {},
  focusOut,
  onOptionSelection,
  setInputState,
  options: sampleOptions,
};

const sampleNestedOptions = [
  {
    label: 'frequent',
    options: [{ label: 'Udaipur', value: 'Udaipur' }, { label: 'Mumbai', value: 'Mumbai' }, { label: 'Akola', value: 'Akola' }],
  },
  { label: 'others', options: [{ label: 'Chennai', value: 'Chennai' }, { label: 'Madras', value: 'Madras' }] },
];

const flatNestedOptions = [
  { label: 'frequent' },
  { label: 'Udaipur', value: 'Udaipur' },
  { label: 'Mumbai', value: 'Mumbai' },
  { label: 'Akola', value: 'Akola' },
  { label: 'others' },
  { label: 'Chennai', value: 'Chennai' },
  { label: 'Madras', value: 'Madras' },
];

const flatNestedOptionsFilteredWithMumbai = [{ label: 'Mumbai', value: 'Mumbai' }];

describe('Components loaded', () => {
  const component = mount(<ControlledDropDown {...props}>{() => null}</ControlledDropDown>);
  describe('Options List Visible / Invisible Cases', () => {
    describe('Options List Visible / Invisible Cases', () => {
      it("shouldn't be able to show options if field is not focused", () => {
        component.setProps({ isFocused: false });
        expect(component.instance().canShowOptions()).toBeFalsy();
      });
      it("shouldn't be able to show options if no options available", () => {
        component.setProps({ options: [] });
        expect(component.instance().canShowOptions()).toBeFalsy();
      });
      it("shouldn't be able to show options if user entered values mismatches", () => {
        component.setProps({ value: 'asdasd' });
        expect(component.instance().canShowOptions()).toBeFalsy();
      });
    });
  });
});

describe('field in focused having options as Mumbai, Udaipur and Akola', () => {
  const component = mount(
    <ControlledDropDown {...props} options={sampleOptions}>
      {() => null}
    </ControlledDropDown>,
  );
  it('should show all options if no user entered value', () => {
    expect(component.state('options')).toContainEqual(
      expect.objectContaining(
        ...[{ label: 'Udaipur', value: 'Udaipur' }, { label: 'Mumbai', value: 'Mumbai' }, { label: 'Akola', value: 'Akola' }],
      ),
    );
  });
  it('should show 2 options (Mumbai and Udaipur) if user entered value is u', () => {
    component.setProps({ value: 'u', isDirty: true });
    expect(component.state('options')).toContainEqual(expect.objectContaining(sampleOptions[0], sampleOptions[1]));
  });
  it('should show 1 option (Akola) if user entered value is k', () => {
    component.setProps({ value: 'k', isDirty: true });
    expect(component.state('options')).toContainEqual(expect.objectContaining(sampleOptions[2]));
  });
  it('should show 1 option (Akola) if no user entered value is K (checking case insensitivity)', () => {
    component.setProps({ value: 'K', isDirty: true });
    expect(component.state('options')).toContainEqual(expect.objectContaining(sampleOptions[2]));
  });
});

describe('when field is focused and the user tabs after entering a matching option value', () => {
  const component = mount(<ControlledDropDown {...props}>{() => null}</ControlledDropDown>);
  component.setProps({ isFocused: true });
  component.setProps({ value: 'm', isChangedEvent: true, isDirty: true });
  component.setProps({ value: 'mu' });
  component.setProps({ value: 'mum' });
  component.setProps({ isTabKeyPressed: true });
  it('should select highlighted option', () => {
    expect(onOptionSelection).toHaveBeenCalledWith(expect.objectContaining(sampleOptions[1]), expect.objectContaining(props));
  });
});

describe('when field is focused and the user selects Mumbai option by clicking on it', () => {
  const component = mount(
    <ControlledDropDown {...props} options={sampleOptions} onOptionSelection={onOptionSelection}>
      {() => null}
    </ControlledDropDown>,
  );
  component.setProps({ isFocused: true });
  component.instance().onOptionSelection(sampleOptions[1], 1);
  component.setProps({ isFocused: false, isFocusedOut: true });
  it('should select highlighted option', () => {
    expect(onOptionSelection).toHaveBeenCalledWith(expect.objectContaining(sampleOptions[1]), expect.objectContaining(props));
  });
});

describe('field in focused having options as Mumbai, Udaipur and Akola with input value as test and no result display print is allowed', () => {
  const component = mount(
    <ControlledDropDown {...props} isChangedEvent options={sampleOptions}>
      {() => null}
    </ControlledDropDown>,
  );
  component.setProps({ isFocused: true });
  component.setProps({ value: 't', isDirty: true });
  component.setProps({ value: 'te' });
  component.setProps({ value: 'tes' });
  component.setProps({ value: 'test' });
  it('should show no result found', () => {
    expect(component.instance().canShowNoResultFound()).toBeTruthy();
  });
});

describe('field in focused having options as Mumbai, Udaipur and Akola with input value as test and no result display print is disallowed', () => {
  const component = mount(
    <ControlledDropDown {...props} hideNoResultFound options={sampleOptions} canShowNoResultFound={false}>
      {() => null}
    </ControlledDropDown>,
  );
  component.setProps({ isFocused: true });
  component.setProps({ value: 't', isDirty: true });
  component.setProps({ value: 'te' });
  component.setProps({ value: 'tes' });
  component.setProps({ value: 'test' });
  it('should not show no result found', () => {
    expect(component.instance().canShowNoResultFound()).toBeFalsy();
  });
});

describe('field in focused having options as Mumbai, Udaipur and Akola with Mumbai as populated value', () => {
  const component = mount(
    <ControlledDropDown {...props} options={sampleOptions} value="Mumbai">
      {() => null}
    </ControlledDropDown>,
  );
  it('should show Mumbai as pre-selected by highlighting the field', () => {
    expect(component.state('highlightedOptionIndex')).toEqual(1);
  });
});

describe('field is focused having options and has no user input', () => {
  const component = mount(
    <ControlledDropDown {...props} options={sampleOptions}>
      {() => null}
    </ControlledDropDown>,
  );
  component.setProps({ isFocused: true });
  it('should show options ', () => {
    expect(component.instance().canShowOptions()).toBeTruthy();
  });
});

describe(`nested options as ${JSON.stringify(sampleNestedOptions)} with Mumbai as populated value`, () => {
  const component = mount(
    <ControlledDropDown {...props} options={sampleNestedOptions} value="Mumbai">
      {() => null}
    </ControlledDropDown>,
  );
  it('should show flat options', () => {
    expect(component.state('options')).toContainEqual(expect.objectContaining(...flatNestedOptions));
  });
  it('should show Mumbai as pre-selected by highlighting the field', () => {
    expect(component.state('highlightedOptionIndex')).toEqual(2);
  });
});

describe('field is focused and user inputs text value to search for the desired options', () => {
  const component = mount(
    <ControlledDropDown {...props} options={sampleNestedOptions}>
      {() => null}
    </ControlledDropDown>,
  );
  component.setProps({ isFocused: true });
  component.setProps({ value: 'm', isDirty: true });
  component.setProps({ value: 'mu' });
  component.setProps({ value: 'mum' });
  component.setProps({ value: 'mumb' });
  it('should filter options', () => {
    expect(component.state('options')).toContainEqual(expect.objectContaining(flatNestedOptionsFilteredWithMumbai[0]));
  });
});

describe('Components having options (sample in our case array of 3 objects)', () => {
  const component = mount(
    <ControlledDropDown {...props} options={sampleOptions} values="Mumbai,Udaipur">
      {() => null}
    </ControlledDropDown>,
  );
  component.setProps({ options: [{ label: 'test' }, { label: 'other' }, { label: 'test' }] });
  it('should focus on next option (index 1 when current selected index is 0) on down key press', () => {
    component.setProps({
      moveDown: 1,
    });
    expect(component.state('highlightedOptionIndex')).toEqual(1);
  });
  it('should focus on previous option (index 0 when current selected index is 1) on up key press', () => {
    component.setProps({
      moveUp: 1,
    });
    expect(component.state('highlightedOptionIndex')).toEqual(0);
  });
});
