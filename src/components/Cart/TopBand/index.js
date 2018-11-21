import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';
import DisplayAmount from '../../Common/DisplayAmount';

const TopBand = props => {
  let bandMessage = '';
  if (props.isOrderSuccess) {
    props.orderStatus === 'Activated' && (bandMessage = <span>{`Congratulations! Your order has been activated`}</span>);

    props.orderStatus === 'Received' && (bandMessage = <span>{`Thank You! Your request has been received`}</span>);
  } else if (props.offerDiscountPerc > 0 && props.offerDiscountedPercPrice) {
    bandMessage = (
      <span>
        {`You are saving `}
        <s.FontBold>
          <DisplayAmount amount={props.offerDiscountedPercPrice} currency={props.currency} />
        </s.FontBold>
        {` on your selected plan!`}
      </span>
    );
  } else if (props.offerDiscountAmount) {
    bandMessage = (
      <span>
        {`You are saving `}
        <s.FontBold>
          <DisplayAmount amount={props.offerDiscountAmount} currency={props.currency} />
        </s.FontBold>
        {` on your selected plan!`}
      </span>
    );
  } else {
    bandMessage = <span>{`Upgrade to Premium and we guarantee you will find a Match!`}</span>;
  }
  return (
    <s.TopBand>
      <s.TopHeader>
        <s.NormalLeft>{bandMessage}</s.NormalLeft>
      </s.TopHeader>
    </s.TopBand>
  );
};
TopBand.defaultProps = {
  currency: '',
  offerDiscountPerc: 0,
  offerDiscountAmount: 0,
  offerDiscountedPercPrice: 0,
  isOrderSuccess: false,
  orderStatus: 'Received',
};
TopBand.propTypes = {
  currency: PropTypes.string,
  offerDiscountPerc: PropTypes.number,
  offerDiscountAmount: PropTypes.number,
  offerDiscountedPercPrice: PropTypes.number,
  isOrderSuccess: PropTypes.bool,
  orderStatus: PropTypes.string,
};

export default TopBand;
