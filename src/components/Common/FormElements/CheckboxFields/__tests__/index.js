import React from 'react';
import { mount } from 'enzyme';
import Checkbox from '@material-ui/core/Checkbox';
import Checkboxes from '../../CheckboxFields';

const props = {
  onChange() {},
  checked: false,
  value: '',
};

// const spyToogleTnC = jest.spyOn(Checkboxes.prototype, 'change');

describe('Checkboxes Component', () => {
  const CheckboxesComponent = mount(<Checkboxes {...props} />);

  it('Checkboxes Component should be mount', () => {
    expect(CheckboxesComponent).toHaveLength(1);
  });

  describe('click on checkbox', () => {
    CheckboxesComponent.find(Checkbox).simulate('change');

    it('toogleTnC function is called', () => {
      // const  onChange = jest.fn();
      // spyToogleTnC(onChange);
      // (spyToogleTnC).toHaveBeenCalled();
      // expect(spyToogleTnC).toHaveBeenCalled();
    });
  });

  /* describe('click on checkbox', () => {
    CheckboxesComponent.find('[type="checkbox"]').simulate('change');
    it('toogleTnC function is called', () => {
      expect(spyToogleTnC).toHaveBeenCalled();
    });
    it('state form input tnc checked is true', () => {
      expect(ProfileVerificationConsentShallow.state('form').tnc.isChecked).toBeFalsy();
    });
  });
*/
});
