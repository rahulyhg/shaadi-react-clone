import React from 'react';
import PropTypes from 'prop-types';
import { formatCurrency } from './currencyUtils';

class DisplayAmount extends React.PureComponent {
  render() {
    return (
      <span id={`data_test_${this.props.product_code}_${this.props.postFix}`}>
        {this.props.amount && this.props.currency && formatCurrency(this.props.currency, this.props.amount, this.props.fractionAllowed)}
      </span>
    );
  }
}
DisplayAmount.defaultProps = {
  amount: 0,
  currency: '',
  fractionAllowed: 0,
  product_code: '',
  postFix: '',
};
DisplayAmount.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  fractionAllowed: PropTypes.number,
  product_code: PropTypes.string,
  postFix: PropTypes.string,
};
export default DisplayAmount;
