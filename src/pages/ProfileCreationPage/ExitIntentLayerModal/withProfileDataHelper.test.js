import React from 'react';
import { mount } from 'enzyme';
import withProfileDataHelper from './withProfileDataHelper';

const DummyComponent = () => <div />;
const ComponentFromHOC = withProfileDataHelper(DummyComponent);

const props = {
  memberlogin: '',
  image_path: '',
  mother_tongue: '',
  nearest_city: '',
};

describe('with Profile Data Helper HOC', () => {
  const mountedComponent = mount(<ComponentFromHOC {...props} />);
  it('should have uid props having memberlogin value', () => {
    expect(mountedComponent.find(DummyComponent).props().uid).toEqual(props.memberlogin);
  });
  it('should have photoUrl props having image_path value', () => {
    expect(mountedComponent.find(DummyComponent).props().photoUrl).toEqual(props.image_path);
  });
  it('should have motherTongue props having mother_tongue value', () => {
    expect(mountedComponent.find(DummyComponent).props().motherTongue).toEqual(props.mother_tongue);
  });
  it('should have city props having nearest_city value', () => {
    expect(mountedComponent.find(DummyComponent).props().city).toEqual(props.nearest_city);
  });
});
