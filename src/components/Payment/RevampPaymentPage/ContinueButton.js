import PropTypes from 'prop-types';
import React from 'react';
import SvgLoader from '../../Common/SvgLoader';
import './payment-style.css';

class ContinueButton extends React.Component {
  state = {
    clicked: false,
  };
  handleClick = e => {
    if (!this.state.clicked) {
      this.setState({ clicked: true }, () => {
        this.props.placeCart(e);
      });
    }
  };
  render() {
    const { productCode, btnloading } = this.props;
    const { clicked } = this.state;
    const showLoader = !!(clicked && btnloading);
    return (
      <div
        className="continue_btn"
        data-test-selector="continue"
        onClick={e => this.handleClick(e)}
        name="pay"
        id={`data_test_continue_${productCode}`}
        role="presentation"
      >
        {!showLoader && `Continue`}
        {showLoader && <SvgLoader isVisible isPaymentLoader />}
      </div>
    );
  }
}
ContinueButton.propTypes = {
  productCode: PropTypes.string.isRequired,
  placeCart: PropTypes.func.isRequired,
  btnloading: PropTypes.bool.isRequired,
};
export default ContinueButton;
