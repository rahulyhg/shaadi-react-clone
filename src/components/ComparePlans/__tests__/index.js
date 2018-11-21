import React from 'react';
import { mount } from 'enzyme';
import ComparePlans from '../../ComparePlans';
import CompareTable from '../CompareTable';
import { headerElement } from '../utils';

jest.mock('../../Common/Link');

describe('ComparePlans', () => {
  describe('ComparePlans : Render', () => {
    it('Compare Plans', () => {
      const comparePlans = mount(<ComparePlans />);
      expect(comparePlans.find('CompareContainer').exists()).toBe(true);
      expect(comparePlans.find('CompareHeading').text()).toEqual('Compare Membership Plans');
    });

    it('Compare Plans: Table Header', () => {
      const props = headerElement[0];
      const comparePlansHeader = mount(<CompareTable {...props} />);
      expect(comparePlansHeader.text()).toContain('Features');
    });

    it('Compare Plans: Table Rows', () => {
      headerElement.slice(1, headerElement.length).forEach(props => {
        const comparePlansRows = mount(<CompareTable {...props} />);
        props.columns.forEach(node => {
          node.text && expect(comparePlansRows.text()).toContain(node.text.replace(/(<br \/>)/g, ''));
        });
      });
    });
  });
});
