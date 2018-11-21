import PropTypes from 'prop-types';
import React from 'react';
import s from '../styles';

const dropDownOptions = (list, listKey, listValue, listDisplay) =>
  list.map(item => (
    <option key={listKey ? item[listKey] : item} value={listValue ? item[listValue] : item}>
      {listDisplay ? item[listDisplay] : item}
    </option>
  ));
const PaymentDropDown = props => {
  const {
    name,
    id,
    value,
    onChange,
    formErrors,
    defaultText,
    type,
    list,
    otherList,
    listKey,
    label,
    otherLabel,
    listValue,
    listDisplay,
    refValue,
    className,
  } = props;
  const dropDownProps = { name, id, value, type, formErrors, className };
  return (
    <span>
      {((type === 'small' || type === 'big') && (
        <s.SelectDropDown innerRef={refValue} onChange={event => onChange(event)} {...dropDownProps}>
          <option defaultValue value="">
            {defaultText}
          </option>
          {dropDownOptions(list, listKey, listValue, listDisplay)}
        </s.SelectDropDown>
      )) || (
        <s.SelectDropDown innerRef={refValue} onChange={event => onChange(event)} {...dropDownProps}>
          <optgroup label={label}>
            <option defaultValue value="">
              {defaultText}
            </option>
            {dropDownOptions(list, listKey, listValue, listDisplay)}
          </optgroup>
          <optgroup label={otherLabel}>{dropDownOptions(otherList, listKey, listValue, listDisplay)}</optgroup>
        </s.SelectDropDown>
      )}
    </span>
  );
};
PaymentDropDown.defaultProps = {
  listKey: '',
  label: '',
  listValue: '',
  listDisplay: '',
  otherList: [],
  otherLabel: '',
  formErrors: {},
  list: [],
  refValue: {
    current: null,
  },
  className: '',
};
PaymentDropDown.propTypes = {
  ...PropTypes.cartDropDownProps,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultText: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  listKey: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  listValue: PropTypes.string.isRequired,
  listDisplay: PropTypes.string.isRequired,
  otherLabel: PropTypes.string.isRequired,
  refValue: PropTypes.shape({
    current: PropTypes.object,
  }).isRequired,
  className: PropTypes.string,
};

export default PaymentDropDown;
