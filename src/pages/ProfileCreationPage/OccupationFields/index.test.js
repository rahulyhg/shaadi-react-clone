import React from 'react';
import { shallow } from 'enzyme';
import OccupationFields from './index';
import WorkingWithField from './WorkingWithField';
import WorkingAsField from './WorkingAsField';
import EmployerField from './EmployerField';
import AnnualIncomeField from './AnnualIncomeField';

describe('Residency Fields', () => {
  const component = shallow(<OccupationFields />);
  it('should have Work With Field', () => {
    expect(component.find(WorkingWithField)).toHaveLength(1);
  });
  it('should have Working As Field', () => {
    expect(component.find(WorkingAsField)).toHaveLength(1);
  });
  it('should have Employer Field', () => {
    expect(component.find(EmployerField)).toHaveLength(1);
  });
  it('should have Annual Income Field', () => {
    expect(component.find(AnnualIncomeField)).toHaveLength(1);
  });
});
