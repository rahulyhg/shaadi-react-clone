import PropTypes from 'prop-types';
import React from 'react';
import s from '../styles';
import Tooltip from '../../../Common/Tooltip';
import DisplayAmount from '../../../Common/DisplayAmount';

class ProfileBoosterBox extends React.PureComponent {
  onProfileBoosterClick = event => {
    this.props.doProfileBoosterToggle(event.target.checked);
  };
  render() {
    const { isProfileBoosterChecked, currency, displayAmount } = this.props;
    return (
      <s.ProfileBoosterBox>
        <s.CheckBoxContainer>
          <s.CheckBoxWrapper>
            <s.CheckBox
              checked={isProfileBoosterChecked}
              onChange={event => this.onProfileBoosterClick(event)}
              type="checkbox"
              name="profile_booster"
              id="profile_booster"
              value="true"
            />
          </s.CheckBoxWrapper>
          <s.ProfileBooster id="add_blaster">
            Add <s.ProductName>Profile Booster</s.ProductName>
            <span id="profile_booster_tooltip">
              <Tooltip isQuestionMark offset={[0, -5]} overlay={<span>Get featured on top of search results.</span>} />
            </span>
          </s.ProfileBooster>
          <s.BoosterPriceSummery isChecked={isProfileBoosterChecked} id="blaster_price">
            <DisplayAmount amount={displayAmount} currency={currency} />
          </s.BoosterPriceSummery>
        </s.CheckBoxContainer>
        <s.SubText>Get 10 times higher visibility.</s.SubText>
      </s.ProfileBoosterBox>
    );
  }
}
ProfileBoosterBox.propTypes = {
  currency: PropTypes.string.isRequired,
  displayAmount: PropTypes.number.isRequired,
  doProfileBoosterToggle: PropTypes.func.isRequired,
  isProfileBoosterChecked: PropTypes.bool.isRequired,
};
export default ProfileBoosterBox;
