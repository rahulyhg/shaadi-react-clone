import React from 'react';
import { mount } from 'enzyme';
import ControlledInput from './ControlledInput';
import getMockedEvent from '../../../__tests__/factory/utils/getMockedEvent';

const focus = jest.fn();
const blur = jest.fn();
const onChange = jest.fn();
const props = { onChange };

describe('Controlled Input', () => {
  describe('Components loaded', () => {
    const component = mount(<ControlledInput {...props}>{() => null}</ControlledInput>);
    const spyhandleSpaceKeyPress = jest.spyOn(component.instance(), 'handleSpaceKeyPress');
    it('Component Loaded', () => {
      expect(component).toHaveLength(1);
    });
    it('should have a reference to its input element', () => {
      const element = {
        focus,
        blur,
      };
      component.instance().inputRef(element);
      expect(component.instance().inputElement).toEqual(element);
    });
    it('Input Trigger Focus', () => {
      component.instance().focus();
      expect(focus).toHaveBeenCalled();
    });
    it('Input Trigger Focus out', () => {
      component.instance().focusOut();
      expect(blur).toHaveBeenCalled();
    });
    describe('Input on Focus', () => {
      beforeEach(() => {
        component.instance().onFocus(getMockedEvent());
      });
      it('should be focused', () => {
        expect(component.state('isFocused')).toBeTruthy();
      });
      it('should not be focused out', () => {
        expect(component.state('isFocusedOut')).toBeFalsy();
      });
      it('should not show error', () => {
        expect(component.instance().canShowError()).toBeFalsy();
      });
      it('down key pressed Counter should be reset to 0', () => {
        expect(component.state('upKeyPressedCount')).toEqual(0);
      });
      it('down key pressed Counter should be reset to 0', () => {
        expect(component.state('downKeyPressedCount')).toEqual(0);
      });
      it('HTML5 validation allowed or disallowed as per props', () => {
        expect(component.instance().onInvalid(getMockedEvent())).toEqual(component.props().allowHtml5Validation);
      });
    });
    describe('Input on key down press', () => {
      it('up key pressed counter 1 when up arrow is clicked once', () => {
        component.instance().onKeyDown(getMockedEvent({ keyCode: 38 }));
        expect(component.state('upKeyPressedCount')).toEqual(1);
      });
      it('down key pressed counter 1 when down arrow is clicked once', () => {
        component.instance().onKeyDown(getMockedEvent({ keyCode: 40 }));
        expect(component.state('downKeyPressedCount')).toEqual(1);
      });
      it('up key pressed counter 3 when up arrow is clicked twice more', () => {
        component.instance().onKeyDown(getMockedEvent({ keyCode: 38 }));
        component.instance().onKeyDown(getMockedEvent({ keyCode: 38 }));
        expect(component.state('upKeyPressedCount')).toEqual(3);
      });
      it('down key pressed counter 3 when down arrow is clicked once more', () => {
        component.instance().onKeyDown(getMockedEvent({ keyCode: 40 }));
        expect(component.state('downKeyPressedCount')).toEqual(2);
      });
      it('on tab key press', () => {
        component.instance().onKeyDown(getMockedEvent({ keyCode: 9 }));
        expect(component.state('isTabKeyPressed')).toBeTruthy();
      });
      it('on enter key press', () => {
        component.instance().onKeyDown(getMockedEvent({ keyCode: 13 }));
        expect(component.state('isEnterKeyPressed')).toBeTruthy();
      });
      it('on space key press', () => {
        component.setProps({ allowSpaces: false, allowLeadingSpace: false });
        component.instance().onKeyDown(getMockedEvent({ keyCode: 32 }));
        expect(spyhandleSpaceKeyPress).toHaveBeenCalled();
      });
    });
    describe('Input on Focus Out', () => {
      beforeEach(() => {
        component.instance().onBlur(getMockedEvent());
      });
      it('should not be focused', () => {
        expect(component.state('isFocused')).toBeFalsy();
      });
      it('should be focused out', () => {
        expect(component.state('isFocusedOut')).toBeTruthy();
      });
      /* it('should show error if invalid', () => {
        expect(component.instance().canShowError()).toBeTruthy();
      }); */
      it('up key pressed counter should be reset to 0', () => {
        expect(component.state('upKeyPressedCount')).toEqual(0);
      });
      it('down key pressed counter should be reset to 0', () => {
        expect(component.state('downKeyPressedCount')).toEqual(0);
      });
    });
    describe('input focused and trying to enter an alphabet when it is not allowed', () => {
      beforeEach(() => {
        component.setProps({ allowLetters: false });
        component.instance().onFocus(getMockedEvent());
        component.instance().onChange(getMockedEvent({ value: '9230A' }));
        component.instance().onBlur(getMockedEvent());
      });
      afterEach(() => {
        component.setProps({ allowLetters: true });
      });
      it('user tries to enter "9230A" but it will remain "9230"', () => {
        expect(component.state('value')).toEqual('9230');
      });
    });
    describe('input focused and trying to enter special characters when it is not allowed', () => {
      beforeEach(() => {
        component.setProps({ allowSpecialCharacs: false });
        component.instance().onFocus(getMockedEvent());
        component.instance().onChange(getMockedEvent({ value: 'abcd#' }));
        component.instance().onBlur(getMockedEvent());
      });
      afterEach(() => {
        component.setProps({ allowSpecialCharacs: true });
      });
      it('user tries to enter "abcd"# but it will remain "abcd"', () => {
        expect(component.state('value')).toEqual('abcd');
      });
    });
    describe('set component state externally', () => {
      component.instance().setInputState({ newKey: 'newValue' });
      it('add a key named "newKey" having value as "newValue" therefor should have key-value pair of the same', () => {
        expect(component.state('newKey')).toEqual('newValue');
      });
    });
  });
});

describe('leaving trailing space on input and focusing out', () => {
  const component = mount(<ControlledInput {...props}>{() => null}</ControlledInput>);
  component.instance().onFocus(getMockedEvent());
  component.instance().onChange(getMockedEvent({ value: 'abcd ' }));
  component.instance().onBlur(getMockedEvent());
  it('user tries to enter "abcd " but it will remain "abcd"', () => {
    expect(component.state('value')).toEqual('abcd');
  });
});

describe('input focused and value changed to empty then focused out while being required', () => {
  const component = mount(<ControlledInput {...props}>{() => null}</ControlledInput>);
  component.setProps({ isRequired: true });
  component.instance().onFocus(getMockedEvent());
  component.instance().onChange(getMockedEvent({ value: '' }));
  component.instance().onBlur(getMockedEvent());
  it('should show error', () => {
    expect(component.instance().canShowError()).toBeTruthy();
  });
});

describe('input focused and value changed, having 4 characters then focused out while having min length as 6', () => {
  const component = mount(<ControlledInput {...props}>{() => null}</ControlledInput>);
  component.setProps({ minLength: 6 });
  component.instance().onFocus(getMockedEvent());
  component.instance().onChange(getMockedEvent({ value: '1234' }));
  component.instance().onBlur(getMockedEvent());
  it('should show error', () => {
    expect(component.instance().canShowError()).toBeTruthy();
  });
  it('error is for min length', () => {
    expect(component.state('errorsFor').includes('minLength')).toBeTruthy();
  });
});

describe('input focused and value changed, having 11 characters then focused out while having max length as 10', () => {
  const component = mount(<ControlledInput {...props}>{() => null}</ControlledInput>);
  component.setProps({ maxLength: 10, canExceedMaxLength: true });
  component.instance().onFocus(getMockedEvent());
  component.instance().onChange(getMockedEvent({ value: '12345678901' }));
  component.instance().onBlur(getMockedEvent());
  it('should show error', () => {
    expect(component.instance().canShowError()).toBeTruthy();
  });
  it('error is for max length', () => {
    expect(component.state('errorsFor').includes('maxLength')).toBeTruthy();
  });
});

describe('input focused and value changed, having alphabet characters then focused out while having regex patter to allow number only', () => {
  const component = mount(<ControlledInput {...props}>{() => null}</ControlledInput>);
  component.setProps({ pattern: '[0-9]' });
  component.instance().onFocus(getMockedEvent());
  component.instance().onChange(getMockedEvent({ value: 'asd' }));
  component.instance().onBlur(getMockedEvent());
  it('should show error', () => {
    expect(component.instance().canShowError()).toBeTruthy();
  });
  it('error should be for pattern', () => {
    expect(component.state('errorsFor').includes('pattern')).toBeTruthy();
  });
});
