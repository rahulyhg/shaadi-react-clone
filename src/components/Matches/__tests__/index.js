import React from 'react';
import { shallow } from 'enzyme';
import { props, dashBoard, matchesTypes, profiles } from './utils/factory';
import Matches from '..';
import Item from '../Items';

const onAction = jest.mock().fn;
const createProps = type => ({
  ...props,
  profiles,
  widgetType: type,
  heading: matchesTypes[type].heading,
  count: dashBoard[type].request_count,
  paginator: dashBoard[type].paginator,
  results: dashBoard[type].data,
  onAction,
});
describe('Matches Widgets Collection', () => {
  Object.keys(matchesTypes).forEach(type => {
    describe(`Widget Type :${type}`, () => {
      const compProps = createProps(type);

      const Comp = shallow(<Matches {...compProps} />);
      it(`should mount MathchesWideget of type : ${type}`, () => {
        shallow(<Matches {...compProps} />);
      });
      it('Should Have Proper Heading', () => {
        expect(Comp.find("[className='widgetHeader']").text()).toContain(matchesTypes[type].heading);
      });
      it('Should show all profile card', () => {
        expect(Comp.find(Item).length).toBe(Object.keys(compProps.results).length);
      });
    });
  });
});
