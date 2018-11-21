import React from 'react';
import { mount } from 'enzyme';
import MultiChoice from '../index';

const props = {
  id: '1',
  display_order: '1',
  type: 'multichoice',
  title: 'What do you like about Shaadi.com?',
  isRequired: 'true',
  choices: {
    '12': 'Easy to Use',
    '13': 'Quality of Matches',
    '14': 'Lots of Matches',
  },
  storeAnswers() {},
};

describe('MultiChoice Question', () => {
  const storeAnswers = jest.fn();
  const newProps = { ...props, storeAnswers };
  const wrapper = mount(<MultiChoice {...newProps} />);
  it('Should show question', () => {
    expect(wrapper.debug()).toContain('What do you like about Shaadi.com?');
  });

  it('should display choices', () => {
    expect(wrapper.find('RadioTabGroup')).toHaveLength(1);
    expect(
      wrapper
        .find('label')
        .at(0)
        .html(),
    ).toContain('Easy to Use');
    expect(
      wrapper
        .find('label')
        .at(1)
        .html(),
    ).toContain('Quality of Matches');
    expect(
      wrapper
        .find('label')
        .at(2)
        .html(),
    ).toContain('Lots of Matches');
  });

  it('initialize `state` with the multi choice options', () => {
    expect(wrapper.state()).toEqual({ choices: [], render: 0 });
  });

  describe('Test MultiChoice selection behaviour...', () => {
    it('Should add to `state` when clicked', () => {
      const event = jest.fn();
      const id = 12;
      wrapper.instance().onChipSelection(event, { value: id });
      expect(wrapper.state()).toEqual({ choices: [{ choiceMade: 'Easy to Use', id }], render: 1 });
    });

    it('Should add to `state` when clicked', () => {
      const event = jest.fn();
      const id = 13;
      wrapper.instance().onChipSelection(event, { value: id });
      expect(wrapper.state()).toEqual({
        choices: [{ choiceMade: 'Easy to Use', id: 12 }, { choiceMade: 'Quality of Matches', id: 13 }],
        render: 2,
      });
    });

    it('Should remove from `state` when re-clicked', () => {
      const event = jest.fn();
      const id = 12;
      wrapper.instance().onChipSelection(event, { value: id });
      expect(wrapper.state()).toEqual({ choices: [{ choiceMade: 'Quality of Matches', id: 13 }], render: 3 });
    });
  });
});
