import React from 'react';
import { shallow } from 'enzyme';
import { props, dashBoard, matchesTypes, profiles } from './utils/factory';
import Item from '../Items';
import Eoi from '../../Common/Eoi';

const onAction = jest.mock().fn;
const createProps = type => ({
  ...props,
  profile: profiles[dashBoard[type].data[0].uid],
  onAction,
  evt_ref: '',
  renderType: matchesTypes[type].widget,
  item: dashBoard[type].data[0],
});
describe('Matches Cards', () => {
  Object.keys(matchesTypes).forEach(type => {
    describe(` Type :${type}`, () => {
      const compProps = createProps(type);
      const Comp = shallow(<Item {...compProps} />);
      it(`should mount Card of type : ${type}`, () => {
        shallow(<Item {...compProps} />);
      });
      it(`should have CTA : ${type}`, () => {
        expect(Comp.find(Eoi).length).toBe(1);
      });
    });
  });
});
