import React from 'react';
import { mount } from 'enzyme';
import ProfilePageCreationPage from './index';
import Header from '../../partials/StoppageHeaderPartial';
import Footer from '../../components/Footer/RegFooter';
import Main from './ProfileCreationPageContent';

jest.mock('../../partials/StoppageHeaderPartial');
jest.mock('../../components/Common/Link');
jest.mock('./ProfileCreationPageContent');

describe('Physical Disability Field', () => {
  const mountedComponent = mount(<ProfilePageCreationPage />);
  it('should have a header', () => {
    expect(mountedComponent.find(Header).exists()).toBeTruthy();
  });
  it('should have a main (page content section)', () => {
    expect(mountedComponent.find(Main).exists()).toBeTruthy();
  });
  it('should have a footer', () => {
    expect(mountedComponent.find(Footer).exists()).toBeTruthy();
  });
});
