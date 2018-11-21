import React from 'react';
import { mount } from 'enzyme';
import MUIDrawer from '@material-ui/core/Drawer';
import Drawer from '../index';

describe('Drawer', () => {
  const DrawerComponent = mount(<Drawer open />);

  it('Should render', () => {
    expect(DrawerComponent).toHaveLength(1);
  });

  it('Should render material ui drawer', () => {
    expect(DrawerComponent.find(MUIDrawer)).toHaveLength(1);
  });

  it('Should render children component', () => {
    const TestComponent = () => <div>Test component</div>;
    const DrawerComponentWithProps = mount(<Drawer open />);
    DrawerComponentWithProps.setProps({ open: true, children: <TestComponent /> });
    expect(DrawerComponentWithProps.find(MUIDrawer).text()).toEqual(mount(<TestComponent />).text());
  });
});
