import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';
import DiscountMsg from '../../Common/DiscountMsg';

const PremiumProposition = props => (
  <s.PremiumBannerWrap>
    <s.PremiumHead>Upgrade now to get full access</s.PremiumHead>
    <s.PremiumCloseBtn onClick={props.onModalClose} />
    <s.MemberInfo>
      <s.PremiumPhoto src={props.data.display_photo} />
      <s.MemberMoreInfo>
        <s.PremiumName>{props.data.display_name} </s.PremiumName>
        <s.PremiumMobile>Mobile &nbsp;: xxx xxx xxxx</s.PremiumMobile>
        <s.PremiumEmail>Email &nbsp; &nbsp;: xxxxxxx@xxxxx.com</s.PremiumEmail>
      </s.MemberMoreInfo>
    </s.MemberInfo>
    <s.PremiumTxt>Premium Benefits:</s.PremiumTxt>
    <s.PremiumListWrap>
      <s.PremiumWrap>
        <s.PremiumListUl>
          <s.PremiumList>Chat with your Matches</s.PremiumList>
          <s.PremiumList>View Contact details</s.PremiumList>
        </s.PremiumListUl>
      </s.PremiumWrap>
      <s.PremiumWrap>
        <s.PremiumListUl>
          <s.PremiumList>Get highlighted to your Matches</s.PremiumList>
          <s.PremiumList>Feature on top of Search Results</s.PremiumList>
        </s.PremiumListUl>
      </s.PremiumWrap>
    </s.PremiumListWrap>
    <s.DiscountMsgWrapper>
      <DiscountMsg offer_details={props.data.offer_details} bannerType="premiumbanner" />
    </s.DiscountMsgWrapper>
    <s.PremiumViewPlan isExternal to={`/payment?loc=profile&profileid=${props.data.display_uid}&source=profile_chatnow`} target={'_blank'}>
      View Plans
    </s.PremiumViewPlan>
  </s.PremiumBannerWrap>
);

PremiumProposition.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    display_uid: PropTypes.string.isRequired,
    display_name: PropTypes.string.isRequired,
    display_photo: PropTypes.string.isRequired,
    offer_details: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PremiumProposition;
