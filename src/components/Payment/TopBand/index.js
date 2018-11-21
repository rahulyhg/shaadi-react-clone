import PropTypes from 'prop-types';
import React from 'react';
import OfferDiscountCases from './OfferDiscountCases';
import ScentTrailCases from './ScentTrailCases';
import s from './styles';

const TopBand = ({
  isOfferDetail,
  isScentTrail,
  type,
  maxDiscount,
  discountType,
  showTicker,
  validTill,
  isOldPrice,
  html,
  profileId,
  profileName,
  photo,
  subText,
  currency,
  wwwBaseUrl,
  gender = 'none',
  urlParams: { acceptCount = 0 },
  loading,
  revampPage,
}) => {
  const offerCasesProps = { type, maxDiscount, discountType, showTicker, validTill, isOldPrice, currency, html };
  const scentTrailCasesProps = { type, acceptCount, profileId, profileName, photo, subText, wwwBaseUrl, gender };
  return (
    <s.TopBand revampPage={revampPage}>
      {!loading && (
        <s.Message id="data_test_topband">
          {isOfferDetail && <OfferDiscountCases {...offerCasesProps} />}
          {isScentTrail && <ScentTrailCases {...scentTrailCasesProps} />}
          {!isOfferDetail &&
            !isScentTrail && <s.OfferWrapper>Upgrade to any of our Premium Plans and we guarantee you will find a match!</s.OfferWrapper>}
        </s.Message>
      )}
    </s.TopBand>
  );
};
TopBand.defaultProps = {
  isOfferDetail: false,
  isScentTrail: false,
  type: '',
  maxDiscount: 0,
  discountType: '',
  showTicker: false,
  validTill: '',
  isOldPrice: false,
  html: '',
  profileId: '',
  profileName: '',
  photo: '',
  subText: '',
  currency: '',
  wwwBaseUrl: '',
  gender: 'none',
  urlParams: {
    acceptCount: 0,
    profileId: '',
    source: '',
  },
  loading: true,
  revampPage: false,
};
TopBand.propTypes = {
  isOfferDetail: PropTypes.bool.isRequired,
  isScentTrail: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  maxDiscount: PropTypes.number.isRequired,
  discountType: PropTypes.string.isRequired,
  showTicker: PropTypes.bool.isRequired,
  validTill: PropTypes.string.isRequired,
  isOldPrice: PropTypes.bool.isRequired,
  html: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  gender: PropTypes.oneOf(['male', 'female', 'none']).isRequired,
  urlParams: PropTypes.shape({
    acceptCount: PropTypes.number.isRequired,
    profileId: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  revampPage: PropTypes.bool,
};
export default TopBand;
