import React from 'react';
import { shallow } from 'enzyme';
import ProfileVerificationConsent from '../../ProfileVerificationConsent';
import s from '../styles';
import doProfileAction from '../../../actions/doProfileAction';

const props = {
  uid: '',
  isNative: false,
  layout: 'desktop',
  nextUrl: '',
  user: {
    uid: '7SH123553',
    gender: 'male',
    photos: {
      hasPhotos: true,
      photos: [
        {
          domain_name: '',
          '120X120': '',
        },
      ],
    },
  },
};
props.doProfileAction = doProfileAction;

const spyToogleTnC = jest.spyOn(ProfileVerificationConsent.prototype, 'toogleTnC');

describe('Male profile verification form', () => {
  const ProfileVerificationConsentShallow = shallow(<ProfileVerificationConsent {...props} />);

  it('Male Verification StopPage should mount', () => {
    expect(ProfileVerificationConsentShallow).toHaveLength(1);
  });

  it('Should have a heading (h1)', () => {
    expect(ProfileVerificationConsentShallow.find(s.HelpHeading)).toHaveLength(1);
  });

  it('should have one form element in our component', () => {
    expect(ProfileVerificationConsentShallow.find(s.ProfileFormWrap)).toHaveLength(1);
  });

  it('should have a input text for entering document number', () => {
    expect(ProfileVerificationConsentShallow.find(s.IdNumberWrap)).toHaveLength(1);
  });

  it('should have 1 tnc checkbox', () => {
    expect(ProfileVerificationConsentShallow.find('[type="checkbox"]')).toHaveLength(1);
  });

  it('has a submit button', () => {
    expect(ProfileVerificationConsentShallow.find(s.SubmitBtn)).toHaveLength(1);
  });

  it("has a i don't remember button", () => {
    expect(ProfileVerificationConsentShallow.find(s.Rememberbtn)).toHaveLength(1);
  });

  describe('click on checkbox', () => {
    ProfileVerificationConsentShallow.find('[type="checkbox"]').simulate('change');
    it('toogleTnC function is called', () => {
      expect(spyToogleTnC).toHaveBeenCalled();
    });
    it('state form input tnc checked is true', () => {
      expect(ProfileVerificationConsentShallow.state('form').tnc.isChecked).toBeFalsy();
    });
  });

  describe('CTA', () => {
    it('click on submit button', () => {
      ProfileVerificationConsentShallow.find(s.SubmitBtn).simulate('click', { preventDefault: jest.fn() });
    });

    it("click on I don't remember button", () => {
      ProfileVerificationConsentShallow.find(s.Rememberbtn).simulate('click', { preventDefault: jest.fn() });
    });
  });
});
