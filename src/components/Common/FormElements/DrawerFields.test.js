import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';
import CircularProgress from '@material-ui/core/CircularProgress';
import DrawerFields, { DrawerClose } from './DrawerFields';
import OptionsListing from './OptionsListing';
import ControlledInput from './ControlledInput';
import DrawerTextField from './DrawerTextField';
import ContextProvider from '../Context';
import initializeStore from '../../../store';

const store = initializeStore();

const reqdProps = {
  closeDrawer: jest.fn(),
  onChipRemove: jest.fn(),
  onBlur: jest.fn(),
  name: 'inputName',
  label: 'label',
  open: false,
  deviceInfo: {
    height: 600,
  },
  form: {
    id: 'formId',
    name: 'formName',
  },
};

const context = {
  deviceInfo: { height: 2000, layout: 'mobile' },
};

describe('single value text field', () => {
  const component = mount(
    <ContextProvider {...context}>
      <Provider store={store}>
        <DrawerFields {...reqdProps} />
      </Provider>
    </ContextProvider>,
  );
  it('should have a control input wrap', () => {
    expect(component.find(ControlledInput).exists()).toBeTruthy();
  });
  it('should have a text field', () => {
    expect(component.find(DrawerTextField).exists()).toBeTruthy();
  });
});

describe('field during options loading', () => {
  const component = mount(
    <ContextProvider {...context}>
      <Provider store={store}>
        <DrawerFields {...reqdProps} isLoading />
      </Provider>
    </ContextProvider>,
  );
  it('should show spinner', () => {
    expect(component.find(CircularProgress).exists()).toBeTruthy();
  });
  it('should not show options', () => {
    expect(component.find(OptionsListing).exists()).toBeFalsy();
  });
});

describe('drawer heading', () => {
  const component = mount(
    <ContextProvider {...context}>
      <Provider store={store}>
        <DrawerFields {...reqdProps} />
      </Provider>
    </ContextProvider>,
  );
  it('should always have a cross to close the drawer', () => {
    expect(component.find(DrawerClose).exists()).toBeTruthy();
  });
  it('should close the drawer on user click on the cross', () => {
    component.find(DrawerClose).simulate('click');
    expect(reqdProps.closeDrawer).toHaveBeenCalled();
  });
});

describe('text field', () => {
  const component = mount(
    <ContextProvider {...context}>
      <Provider store={store}>
        <DrawerFields {...reqdProps} isReadOnly />
      </Provider>
    </ContextProvider>,
  );
  it('should not have a text field', () => {
    expect(component.find(DrawerTextField).exists()).toBeFalsy();
  });
  it('should have label as title', () => {
    expect(component.find('label').exists()).toBeTruthy();
  });
  it('should have label having text as Test', () => {
    expect(
      component
        .find('label')
        .at(0)
        .text(),
    ).toEqual('label');
  });
});

describe('autocomplete field drawer', () => {
  it('should not have keep as feature if no user entered value present', () => {
    const component = mount(
      <ContextProvider {...context}>
        <Provider store={store}>
          <DrawerFields {...reqdProps} value="" isAutoComplete canSearch />
        </Provider>
      </ContextProvider>,
    );
    expect(component.find('#keep-as').exists()).toBeFalsy();
  });
  it('should not have keep as feature if no user entered value present', () => {
    const component = mount(
      <ContextProvider {...context}>
        <Provider store={store}>
          <DrawerFields {...reqdProps} value="test" isAutoComplete canSearch />
        </Provider>
      </ContextProvider>,
    );
    expect(component.find('#keep-as').exists()).toBeFalsy();
  });
});

describe('autocomplete field drawer', () => {
  it('should not have keep as feature if no user entered value present', () => {
    const component = mount(
      <ContextProvider {...context}>
        <Provider store={store}>
          <DrawerFields {...reqdProps} value="" />
        </Provider>
      </ContextProvider>,
    );
    expect(component.find('#drawer-done').exists()).toBeFalsy();
  });
  it('should not have keep as feature if no user entered value present', () => {
    const component = mount(
      <ContextProvider {...context}>
        <Provider store={store}>
          <DrawerFields {...reqdProps} drawerValue="India" />
        </Provider>
      </ContextProvider>,
    );
    expect(component.find('#drawer-done').exists()).toBeFalsy();
  });
});
