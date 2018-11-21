import React from 'react';
import { mount } from 'enzyme';
import OnBoardingPhoneSetting from '../index';

const props = {
  history: {
    location: {
      pathname: '/stop-page/phone-setting',
      search: '?p=ZA==',
      hash: '',
      state: undefined,
    },
  },
  phoneSettings: {
    list: [
      {
        id: 'Show To Free And Premium',
        text: 'All my Matches',
        tooltip: 'RECOMMENDED',
      },
      {
        id: 'Show All',
        text: 'Only Premium Members',
        tooltip: '',
      },
      {
        id: 'When I Contact',
        text: 'Only Members I like',
        tooltip: '',
      },
    ],
    loading: false,
    preference: 'Hide My Number',
    memberShipPlan: 'Platinum Plus Member',
    isNative: false,
  },
  user: {
    uid: 'pbshah',
  },
  doPrivacySettings() {},
  wwwBaseUrl: '',
};

describe('On Bording Phone settings Stop-page', () => {
  const handleSubmit = jest.fn();
  const newProps = { ...props, handleSubmit };
  const wrapper = mount(<OnBoardingPhoneSetting {...newProps} />);

  it('Should contain welcome msg', () => {
    expect(wrapper.html()).toContain('WELCOME ONBOARD');
  });
  it('Should contain membership type (Platinum Plus / Diamond plus)', () => {
    expect(wrapper.html()).toContain(`You are now a ${props.phoneSettings.memberShipPlan}`);
  });

  describe('Should render single choice', () => {
    it('Should show question', () => {
      expect(wrapper.debug()).toContain('Choose your Contact Preference');
    });

    it('Should build the phone settings Form with the array of list provided', () => {
      expect(props.phoneSettings.list.length).toBeGreaterThan(1);
    });

    it('should display choices', () => {
      expect(wrapper.find('RadioTabGroup')).toHaveLength(1);
      expect(
        wrapper
          .find('label')
          .at(0)
          .html(),
      ).toContain('All my Matches');
      expect(
        wrapper
          .find('label')
          .at(1)
          .html(),
      ).toContain('Only Premium Members');
      expect(
        wrapper
          .find('label')
          .at(2)
          .html(),
      ).toContain('Only Members I like');
    });

    it('initializes selectedOption with blank array in the `state`', () => {
      expect(wrapper.state()).toEqual({ selectedOption: '', enableSubmit: true, formSubmit: false });
    });

    it('Should contain `Recommended` tag to where tooltip is not empty', () => {
      for (let i = 0; i < props.phoneSettings.list.length; i += 1) {
        if (props.phoneSettings.list[i].tooltip === 'RECOMMENDED') {
          expect(
            wrapper
              .find('label')
              .at(i)
              .html(),
          ).toContain('RECOMMENDED');
        }
      }
    });

    describe('Test single Choice selection behaviour...', () => {
      beforeEach(() => {
        const id = '';
        wrapper.setState({ selectedOption: id, enableSubmit: false, formSubmit: false });
      });
      it('Button should be disable when preference value is `Hide my number`', () => {
        expect(wrapper.state()).toEqual({ selectedOption: '', enableSubmit: false, formSubmit: false });
      });
      it('Should call onChoiceSelection when clicked', () => {
        const event = jest.fn();
        const id = 'Show All';
        wrapper.instance().onChoiceSelection(event, { value: id });
        expect(wrapper.state()).toEqual({ selectedOption: id, enableSubmit: true, formSubmit: false });
      });
    });
  });

  it('Should have submit button', () => {
    expect(
      wrapper
        .find('button')
        .at(3)
        .html(),
    ).toContain('Save');
  });

  describe('button', () => {
    beforeEach(() => {
      wrapper.setState({ selectedOption: '', enableSubmit: true });
    });

    it('Should call submit Form when clicked', () => {
      const event = jest.fn();
      const id = 'Show All';
      wrapper.instance().onChoiceSelection(event, { value: id });
      wrapper
        .find('button')
        .at(3)
        .simulate('click');
      expect(wrapper.state()).toEqual({ selectedOption: id, enableSubmit: true, formSubmit: true });
    });
  });

  describe('Render Thank you page', () => {
    it('should show Thankyou message when form is submitted', () => {
      const id = 'Show All';
      wrapper.setState({ selectedOption: id, enableSubmit: true, formSubmit: true });
      expect(wrapper.find('ThankyouMsg').exists()).toBe(true);
    });
  });
});
