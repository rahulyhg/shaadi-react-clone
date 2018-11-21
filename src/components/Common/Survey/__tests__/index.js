import React from 'react';
import { mount } from 'enzyme';
import Survey from '../index';

const props = {
  questions: [
    {
      id: '1',
      display_order: '1',
      type: 'multichoice',
      title: 'What do you like about Shaadi.com?',
      choices: {
        '12': 'Easy to Use',
        '13': 'Quality of Matches',
        '14': 'Lots of Matches',
      },
      show: true,
    },
    {
      id: '3',
      display_order: '2',
      type: 'rating',
      title: 'Please rate your Experience with us',
      choices: {
        '1': "It's ok!",
        '2': "It's ok!",
        '3': "It's ok!",
        '4': 'Loved It!',
        '5': 'Loved It!',
      },
      show: true,
    },
    {
      id: '2',
      display_order: '3',
      type: 'textarea',
      title: 'Can you tell us what can we do better?',
      placeHolder: 'Write your feedback here',
      show: false,
    },
  ],
  storeAnswers() {},
  enableSubmit: false,
};

describe('Survey', () => {
  const submitForm = jest.fn();

  const newProps = { ...props, submitForm };

  const wrapper = mount(<Survey {...newProps} />);

  it('Should build the Survey Form with the array of Questions provided', () => {
    expect(props.questions.length).toBeGreaterThan(1);
    expect(wrapper.find('MultiChoice').exists()).toBe(true);
    expect(wrapper.find('StarRating').exists()).toBe(true);
  });

  it('initializes answers with blank array in the `state`', () => {
    expect(wrapper.state()).toEqual({ answers: [], enableSubmit: false, layout: 'desktop' });
  });

  it('Should update `state` with answers when user fills form', () => {
    const answers = { id: '1', answer: ['12', '13'] };
    wrapper.instance().storeAnswers(answers);
    expect(wrapper.state()).toEqual({ answers: [answers], enableSubmit: false, layout: 'desktop' });
    wrapper.instance().storeAnswers({ id: '3', answer: '2' });
    expect(wrapper.state()).toEqual({
      answers: [{ answer: ['12', '13'], id: '1' }, { answer: '2', id: '3' }],
      enableSubmit: false,
      layout: 'desktop',
    });
  });

  it('Should have submit button', () => {
    expect(
      wrapper
        .find('button')
        .at(3)
        .html(),
    ).toContain('Submit');
  });

  describe('button', () => {
    beforeEach(() => {
      wrapper.setState({ answers: [], enableSubmit: false });
    });

    it('Should be disbaled if rating is not selected', () => {
      const answers = { id: '1', answer: ['12', '13'] };
      wrapper.instance().storeAnswers(answers);
      expect(wrapper.state()).toEqual({ enableSubmit: false, answers: [answers], layout: 'desktop' });
    });

    it('Should call submit Form when clicked', () => {
      const event = { preventDefault() {} };

      wrapper.setState({ answers: [{ id: '1', answer: ['12', '13'] }], enableSubmit: true, layout: 'desktop' });
      wrapper
        .find('button')
        .at(3)
        .simulate('click', event);
      expect(submitForm).toHaveBeenCalled();
    });
  });
});
