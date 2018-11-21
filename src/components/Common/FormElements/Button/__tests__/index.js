import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../Button';
// import s from '../styles';

const props = {
  onClick() {},
  height: '',
  padding: '',
  layerBtn: '',
  margin: '',
};

describe('Button', () => {
  const ButtonsubComponent = shallow(<Button {...props}>Test</Button>);

  it('Buttonsub component should be mount', () => {
    expect(ButtonsubComponent).toHaveLength(1);
  });

  /* describe('click on checkbox', () => {
    it('toogleTnC function is called', () => {
      ButtonsubComponent.find(s.InputButton).simulate('click');
    });
  }); */
});
