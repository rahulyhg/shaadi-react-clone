import PropTypes from 'prop-types';
import React from 'react';
import createRef from 'create-react-ref/lib/createRef';
import s from '../../styles';
import ErrorText from '../../ErrorText';

const monthRef = createRef();
const yearRef = createRef();
const MonthYear = props => {
  const monthErrorTextProps = {
    id: 'month_year_error',
    name: 'cardMonth',
    show: !!(props.formErrors.cardMonth === false || props.formErrors.cardYear === false),
  };
  return (
    <s.FlexHeading isMonthYear>
      Valid upto<br />
      <s.FieldWrapper isMonthYear>
        <s.SmallFormInput
          innerRef={monthRef}
          formErrors={props.formErrors}
          className="card_exp_month_div"
          id={`iframe_card_exp_month`}
          isMonth
          isMarginRight
          isMarginTop
        />
        <s.SmallFormInput
          innerRef={yearRef}
          formErrors={props.formErrors}
          className="card_exp_year_div"
          id={`iframe_card_exp_year`}
          isYear
          isMarginRight
          isMarginTop
        />
      </s.FieldWrapper>
      <ErrorText {...monthErrorTextProps} />
    </s.FlexHeading>
  );
};
MonthYear.propTypes = {
  formErrors: PropTypes.shape({
    cardNum: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    cvv: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    cardHolderName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    cardMonth: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    cardYear: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    trySubmit: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  }).isRequired,
};
export default MonthYear;
