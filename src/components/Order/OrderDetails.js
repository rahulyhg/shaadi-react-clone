import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';
import DisplayAmount from '../Common/DisplayAmount';
import List from './List';

const OrderDetails = props => {
  const items = props.orderSuccess; // /need to change this as same name is  causing issue
  const note = items.sub_text ? `Note: ${items.sub_text}` : '';
  const amount = Number((items.amount || 0).replace(',', ''));
  const contribution = Number(String(items.shaadi_care_amount || 0).replace(',', ''));
  const details = [
    {
      label: 'Selected Plan',
      text: `${items.product} (${items.duration})`,
    },
    {
      label: 'Order Id',
      text: items.order_id,
    },
    {
      // ///if shaadi cares donation not selected then do not show
      label: 'ShaadiCares Contribution',
      text: contribution !== 0 ? <DisplayAmount amount={contribution} currency={items.currency} /> : contribution,
    },
    {
      label: 'Total Amount',
      text: <DisplayAmount amount={amount} currency={items.currency} />,
    },
    {
      label: 'Payment Mode',
      text: items.mode_of_payment,
    },
  ];

  const constArr = items.contact_details
    ? {
        label: 'Contact Details',
        text: items.contact_details,
      }
    : [];

  const extraDetails = items.order_details.map(extraDetail => ({
    label: extraDetail.label,
    text: extraDetail.text,
  }));

  const finalDetails = details.concat(constArr, extraDetails);
  return (
    <React.Fragment>
      <s.TopNote id="data_test_note">{note}</s.TopNote>
      <s.Box>
        <s.Heading>Order Details</s.Heading>
        <List notesCount={0} isSeperate amount={amount} details={finalDetails} currency={items.currency} />
      </s.Box>
    </React.Fragment>
  );
};
OrderDetails.propTypes = {
  orderSuccess: PropTypes.shape(PropTypes.orderSuccess).isRequired,
};
export default OrderDetails;
