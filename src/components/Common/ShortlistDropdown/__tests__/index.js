import React from 'react';
import { mount } from 'enzyme';
import ShortlistDropdown from '../../ShortlistDropdown';
import factory from './utils/factory';

jest.mock('../../Link');

describe('ShortlistDropdown', () => {
  global.ga = jest.fn();

  describe('should render', () => {
    const [onAddToShortlist, onCreateShortlist, onDirectlyShortlist, onShortlistOpen] = [jest.fn(), jest.fn(), jest.fn(), jest.fn()];
    const props = { ...factory.bigListExample, onAddToShortlist, onCreateShortlist, onDirectlyShortlist, onShortlistOpen };
    beforeEach(() => {
      expect(props.items.length >= 10).toBeTruthy();
    });

    const dropdown = mount(<ShortlistDropdown {...props} />);
    it('list properly', () => {
      const dropdownToggleBtn = dropdown.find('span#dropdownToggleBtn').last();
      expect(dropdownToggleBtn).toBeTruthy();
      dropdownToggleBtn.simulate('click');
      const checkboxes = dropdown.find('input[type="checkbox"]');
      expect(checkboxes.length).toEqual(10);
    });
  });

  describe('with more than 10 items', () => {
    const [onAddToShortlist, onCreateShortlist, onDirectlyShortlist, onShortlistOpen] = [jest.fn(), jest.fn(), jest.fn(), jest.fn()];
    const props = { ...factory.bigListExample, onAddToShortlist, onCreateShortlist, onDirectlyShortlist, onShortlistOpen };
    beforeEach(() => {
      expect(props.items.length >= 10).toBeTruthy();
    });

    const dropdown = mount(<ShortlistDropdown {...props} />);
    it('should not have createShortlist link', () => {
      const dropdownToggleBtn = dropdown.find('span#dropdownToggleBtn').last();
      expect(dropdownToggleBtn).toBeTruthy();
      dropdownToggleBtn.simulate('click');
      const createShortlistLink = dropdown.find('button').last();
      expect(createShortlistLink.text()).not.toEqual('Create new Shortlist');
    });
  });

  describe('with less than 10 items', () => {
    const [onAddToShortlist, onCreateShortlist, onDirectlyShortlist, onShortlistOpen] = [jest.fn(), jest.fn(), jest.fn(), jest.fn()];
    const props = { ...factory.bigListExample, onAddToShortlist, onCreateShortlist, onDirectlyShortlist, onShortlistOpen };
    props.items = props.items.slice(0, 3);
    beforeEach(() => {
      expect(props.items.length < 10).toBeTruthy();
    });

    const dropdown = mount(<ShortlistDropdown {...props} />);
    it('should have createShortlist link', () => {
      const dropdownToggleBtn = dropdown.find('span#dropdownToggleBtn').last();
      expect(dropdownToggleBtn).toBeTruthy();
      dropdownToggleBtn.simulate('click');
      const createShortlistLink = dropdown.find('button').last();
      expect(createShortlistLink.text()).toEqual('Create new Shortlist');
    });
  });
});
