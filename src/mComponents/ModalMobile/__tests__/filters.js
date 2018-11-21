import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import { createMount } from '../../../test-utils';
import Filters from '../Filters';
import factory from './utills/factory';

describe('Filters', () => {
  const onAction = jest.fn();
  const filter = createMount()(<Filters {...factory.props} onAction={onAction} />);
  describe('Viewing', () => {
    it(`Must contain ${factory.filters.length} filters`, () => {
      expect(filter.find(DialogContent).length).toBe(factory.filters.length);
      filter.find(DialogContentText).forEach((node, index) => {
        expect(node.text()).toContain(factory.filters[index].mobileLabel || factory.filters[index].label);
      });
    });
  });
  describe('Interaction', () => {
    filter.find(DialogContentText).forEach(node => {
      it(`${node.text()}`, () => {
        node.childAt(0).simulate('click');
        expect(onAction).toHaveBeenCalled();
      });
    });
  });
});
