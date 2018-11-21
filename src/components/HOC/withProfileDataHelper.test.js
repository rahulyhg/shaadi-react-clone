import React from 'react';
import { mount } from 'enzyme';
import withProfileDataHelper from './withProfileDataHelper';
import draftProfile from '../../helpers/draftProfile.json';

const DummyComponent = () => <div />;
const ComponentFromHOC = withProfileDataHelper(DummyComponent);

describe('With API ', () => {
  const mountedComponent = mount(<ComponentFromHOC draftProfileData={draftProfile} />);
  it('should render the component given to the HOC', () => {
    expect(mountedComponent.find(DummyComponent).exists()).toBeTruthy();
  });
});
