import React from 'react';
import PropTypes from 'prop-types';
import SvgLoader from '../Common/SvgLoader';
import s from './styles';
import OrderDetails from './OrderDetails';
import OrderNotes from './OrderNotes';
import Continue from './Continue';
import TopBand from '../Cart/TopBand';

const Order = props => (
  <React.Fragment>
    <TopBand orderStatus={props.orderSuccess.order_status} isOrderSuccess />
    <s.MainWrapper>
      {(!props.orderSuccess.loading && (
        <React.Fragment>
          <OrderDetails {...props} />
          <OrderNotes {...props} />
          <Continue wwwBaseUrl={props.wwwBaseUrl} crmNo={props.orderSuccess.crm_no || ''} />
        </React.Fragment>
      )) || <SvgLoader isVisible isBigLoader />}
    </s.MainWrapper>
  </React.Fragment>
);
Order.propTypes = {
  orderSuccess: PropTypes.shape(PropTypes.orderSuccess).isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
};
export default Order;
