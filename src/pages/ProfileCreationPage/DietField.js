import React from 'react';
import ResponsiveFormFieldWithOptions from '../../components/Common/FormElements/ResponsiveFormFieldWithOptions';
import withContextConsumer from '../../components/Common/withContextConsumer';
import CustomToolTip from '../../components/Common/CustomToolTip';
import options from '../../constants/list/diet.json';
import ShowHide from '../../components/HOC/ShowHide';
// @todo isolate style
import s from './styles';

const DietField = props => (
  <s.herDietmain>
    <s.herDietWrap>
      <ResponsiveFormFieldWithOptions name="diet" id="diet" placeholder="Select" options={options} isReadOnly {...props} />
    </s.herDietWrap>
    <CustomToolTip id="tooltip-diet" tooltipMargin="0 0 5px">
      Vegan diet excludes all meat, fish and dairy products as well as any food derived from a living animal such as eggs. <br /> <br />{' '}
      Vegan person is a strict vegetarian, who eats only foods of plant origin.
    </CustomToolTip>
  </s.herDietmain>
);

export default withContextConsumer({ contextToFetch: context => context.form.diet })(ShowHide(DietField));
