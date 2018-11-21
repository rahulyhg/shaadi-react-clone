import React from 'react';
import { mount } from 'enzyme';
import SavedSearchBox from '../savedSearchBox';

import factory from './utils/savedSearchFactory';

describe('savedsearch popup', () => {
  const onAction = jest.fn();

  describe('savedsearch can mount', () => {
    it('should mount', () => {
      const props = {
        onModalClose: onAction,
        doProfileAction: onAction,
        // saveSearchBox: {savedSuccess:[]},
        searchType: '',
      };
      const savedsearch = mount(<SavedSearchBox {...props} />);
      expect(
        savedsearch
          .find('h5')
          .first()
          .text(),
      ).toBe('Save this Search');
    });
  });

  describe('savedsearch can mount with no existing saved search', () => {
    it('should have save text field element', () => {
      const props = {
        onModalClose: onAction,
        doProfileAction: onAction,
        saveSearchBox: factory.noSavedSearch,
        searchType: '',
      };

      const savedsearch = mount(<SavedSearchBox {...props} />);
      expect(savedsearch.find('input#searchname').first().length).toBe(1);

      // console.log(savedsearch.find('.existingsearchwrapper').attribs)
      // console.log(savedsearch.getElementsByClassName('existingsearchwrapper').first().style)
      // expect(savedsearch.getElementsByClassName('existingsearchwrapper').first().style).to.have.property('display', 'none');
      expect(savedsearch.find('select#exsitingsearchesfrequency').first().length).toBe(1);

      const buttons = [
        { index: 0, type: 'close', text: '', onClickArgs: [] },
        { index: 1, type: 'saveearch', text: 'Save Search', onClickArgs: [] },
        { index: 2, type: 'close', text: 'Close', onClickArgs: [] },
      ];

      buttons.forEach(({ index, type, text, onClickArgs }) => {
        //   expect(onAction).not.toHaveBeenCalled();
        const button = savedsearch.find('button').at(index);
        expect(button.text()).toEqual(text);
        button.simulate('click');
        // expect(onAction).toHaveBeenCalledWith(...onClickArgs);
      });
    });
  });
});
