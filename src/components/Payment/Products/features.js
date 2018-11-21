import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';
import SvgLoader from '../../Common/SvgLoader';
import FeatureDetails from './featureDetails';

const buttonText = 'Select';

const Features = props => (
  <s.FeaturesWrapper isVisible={props.isVisible} errorMsg={props.errorMsg}>
    <s.FeaturesContainer>
      {props.benefits && (
        <React.Fragment>
          <FeatureDetails benefit={props.benefits[0]} membershipId={props.membershipId} index={0} />
          <FeatureDetails benefit={props.benefits[2]} membershipId={props.membershipId} index={1} />
          <FeatureDetails benefit={props.benefits[1]} membershipId={props.membershipId} index={2} />
          <FeatureDetails benefit={props.benefits[3]} membershipId={props.membershipId} index={3} />
        </React.Fragment>
      )}
    </s.FeaturesContainer>
    <s.ContinueContainer>
      <s.ContinueBtn onClick={props.placeCart} name="pay" id={`data_test_continue_${props.membershipId}`}>
        {!props.btnloading && buttonText}
        {props.btnloading && <SvgLoader isVisible isPaymentLoader />}
      </s.ContinueBtn>
      {props.errorMsg && <s.DiscountError>{props.errorMsg}</s.DiscountError>}
    </s.ContinueContainer>
  </s.FeaturesWrapper>
);

Features.propTypes = {
  benefits: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      applicable: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  errorMsg: PropTypes.string.isRequired,
  placeCart: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  btnloading: PropTypes.bool.isRequired,
  membershipId: PropTypes.string.isRequired,
};
export default Features;
