import PropTypes from 'prop-types';
import React from 'react';
import s from '../styles';
import Tooltip from '../../../Common/Tooltip';
import DisplayAmount from '../../../Common/DisplayAmount';

class ShaadiCareBox extends React.PureComponent {
  onShaadiCareClick = event => {
    this.props.doShaadiCareToggle(event.target.checked);
  };
  render() {
    const { isShaadiCareChecked, displayAmount, currency } = this.props;
    return (
      <s.ShaadiCaresBox>
        <s.CheckBoxContainer>
          <s.CheckBoxWrapper>
            <s.CheckBox
              name="shaadi_care"
              checked={isShaadiCareChecked}
              onChange={event => this.onShaadiCareClick(event)}
              type="checkbox"
              id="shaadicare_checkbox"
              value="true"
            />
          </s.CheckBoxWrapper>
          <s.ProfileBooster id="shaadicare_text">
            Contribute to <s.ProductName>ShaadiCares</s.ProductName>
            <span id="shaadicare_tooltip">
              <Tooltip
                isQuestionMark
                offset={[0, -5]}
                overlay={<span>{"ShaadiCares is a Social Initiative by Shaadi.com to support women's empowerment."}</span>}
              />
            </span>
          </s.ProfileBooster>
          <s.BoosterPriceSummery isChecked={isShaadiCareChecked} id="shaadicare_price">
            <DisplayAmount amount={displayAmount} currency={currency} />
          </s.BoosterPriceSummery>
        </s.CheckBoxContainer>
      </s.ShaadiCaresBox>
    );
  }
}
ShaadiCareBox.propTypes = {
  currency: PropTypes.string.isRequired,
  displayAmount: PropTypes.number.isRequired,
  doShaadiCareToggle: PropTypes.func.isRequired,
  isShaadiCareChecked: PropTypes.bool.isRequired,
};
export default ShaadiCareBox;
