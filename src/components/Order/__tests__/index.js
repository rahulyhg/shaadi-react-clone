import React from 'react';
import { mount, shallow } from 'enzyme';
import Order from '../../Order';
import factory from './utils/factory';
import TopBand from '../../Cart/TopBand';
import OrderDetails from '../../Order/OrderDetails';
import Continue from '../../Order/Continue';
import OrderNotes from '../../Order/OrderNotes';

describe('Order Success', () => {
  const props = { ...factory.orderDetails.orderSuccess };

  describe('Order Component:', () => {
    it('all components loaded', () => {
      const orderComp = shallow(<Order orderSuccess={props} wwwBaseUrl={factory.orderDetails.wwwBaseUrl} />);
      expect(orderComp.find('TopBand').exists()).toBe(true);
      expect(orderComp.find('OrderDetails').exists()).toBe(true);
      expect(orderComp.find('OrderNotes').exists()).toBe(true);
      expect(orderComp.find('Continue').exists()).toBe(true);
    });
  });

  describe('Order Success: Top Band', () => {
    it('proper topband message is available', () => {
      const topBand = mount(<TopBand orderStatus={props.order_status} isOrderSuccess />);
      expect(topBand.find('div[data-topbadge="discountMessage"]').text()).toEqual('Thank You! Your request has been received');
    });
  });
  describe('Order Success: Order Details', () => {
    const orderDetails = mount(<OrderDetails orderSuccess={props} />);

    const contribution = Number(String(props.shaadi_care_amount || 0).replace(',', ''));
    contribution !== 0 && expect(orderDetails.find('DisplayAmount').exists()).toBe(true);

    expect(
      orderDetails
        .find('div')
        .at(0)
        .text(),
    ).toEqual("Note: Your order id is '152222237468', We will activate your order within 2 days of your payment.");
  });
  describe('Order Success: Order Notes', () => {
    const orderNotes = mount(<OrderNotes orderSuccess={props} />);
    expect(orderNotes.find('div')).toHaveLength(1);
    expect(orderNotes.find('div').text()).toContain('');

    it('Order Success: Order Notes Pay At Bank', () => {
      const shaadiCentreProps = props;
      shaadiCentreProps.sub_sections = factory.shaadiCentreNotes.sub_sections;
      const orderNotesShaadiCentre = mount(<OrderNotes orderSuccess={props} />);

      expect(
        orderNotesShaadiCentre
          .find('div')
          .at(2)
          .text(),
      ).toEqual('Visit The Shaadi Centre');
      expect(
        orderNotesShaadiCentre
          .find('div')
          .at(5)
          .text(),
      ).toEqual(
        'Ground floor , 99  Niranjan building, Opp Parsi Gym Khana  Near Marine lines Railway Station Marine Line (west)  Mumbai - 400002',
      );
      expect(
        orderNotesShaadiCentre
          .find('div')
          .at(7)
          .text(),
      ).toEqual('Contact Person:');
      expect(
        orderNotesShaadiCentre
          .find('div')
          .at(8)
          .text(),
      ).toEqual('Swapnil Bhuwad');
      expect(
        orderNotesShaadiCentre
          .find('div')
          .at(10)
          .text(),
      ).toContain('Payable Amount:');

      expect(
        orderNotesShaadiCentre
          .find('div')
          .at(11)
          .find('DisplayAmount')
          .exists(),
      ).toBe(true);
      expect(
        orderNotesShaadiCentre
          .find('div')
          .at(11)
          .text(),
      ).toContain('3,802');
      expect(
        orderNotesShaadiCentre
          .find('div')
          .at(13)
          .text(),
      ).toContain('Contact Number:');
      expect(
        orderNotesShaadiCentre
          .find('div')
          .at(14)
          .text(),
      ).toContain('+91 - 7715885665 / 8779561848');

      expect(
        orderNotesShaadiCentre
          .find('div')
          .at(16)
          .text(),
      ).toContain('How To Pay at Shaadi Centre');

      expect(
        orderNotesShaadiCentre
          .find('div')
          .at(19)
          .text(),
      ).toContain(
        'Orders paid by Cash or Credit Card will be activated instantly. All other payments will be activated within 2 days of clearance.',
      );

      expect(
        orderNotesShaadiCentre
          .find('div')
          .at(22)
          .text(),
      ).toContain('In favour of : People Interactive (I) Pvt. Ltd., Payable at : Mumbai');

      expect(
        orderNotesShaadiCentre
          .find('div')
          .at(25)
          .text(),
      ).toContain(
        'Please mention your Profile ID "SH27475068" and Order ID "151809078175" on the reverse side of the Cheque / Demand Draft',
      );
    });

    it('Order Success: Order Notes Pay At Bank', () => {
      const payAtBankProps = props;
      payAtBankProps.sub_sections = factory.payAtBanknotes.sub_sections;
      const orderNotesPayAtBank = mount(<OrderNotes orderSuccess={props} />);

      expect(
        orderNotesPayAtBank
          .find('div')
          .at(2)
          .text(),
      ).toEqual('Complete your payment at ICICI Bank');
      expect(
        orderNotesPayAtBank
          .find('div')
          .at(5)
          .text(),
      ).toEqual(
        'Visit any ICICI Bank Branch, fill up the Cash Depost Slip and submit it at the Cash Counter. Make sure you have filled the following information in the slip.',
      );
      expect(
        orderNotesPayAtBank
          .find('div')
          .at(7)
          .text(),
      ).toEqual('Account Name:');
      expect(
        orderNotesPayAtBank
          .find('div')
          .at(8)
          .text(),
      ).toEqual('People Interactive (I) Pvt. Ltd');
      expect(
        orderNotesPayAtBank
          .find('div')
          .at(10)
          .text(),
      ).toEqual('Account Number:');
      expect(
        orderNotesPayAtBank
          .find('div')
          .at(11)
          .text(),
      ).toEqual('041405001516');
      expect(
        orderNotesPayAtBank
          .find('div')
          .at(13)
          .text(),
      ).toEqual('Payable Amount:');
      expect(
        orderNotesPayAtBank
          .find('div')
          .at(14)
          .find('DisplayAmount')
          .exists(),
      ).toBe(true);
      expect(
        orderNotesPayAtBank
          .find('div')
          .at(14)
          .text(),
      ).toContain('3,802');
      expect(
        orderNotesPayAtBank
          .find('div')
          .at(16)
          .text(),
      ).toEqual('Order Id:');
      expect(
        orderNotesPayAtBank
          .find('div')
          .at(17)
          .text(),
      ).toEqual('152316979153');
      expect(
        orderNotesPayAtBank
          .find('div')
          .at(19)
          .text(),
      ).toEqual('Profile ID:');
      expect(
        orderNotesPayAtBank
          .find('div')
          .at(20)
          .text(),
      ).toEqual('SH27475068');
    });
  });
  describe('Order Success: Continue', () => {
    const continueComp = mount(<Continue crmNo={props.crm_no} wwwBaseUrl={factory.orderDetails.wwwBaseUrl} />);

    expect(
      continueComp
        .find('div')
        .at(1)
        .text(),
    ).toEqual('Start searching and connecting with your potential partners right away.');
    expect(
      continueComp
        .find('div')
        .at(2)
        .text(),
    ).toContain('For help call us on');
    expect(
      continueComp
        .find('span')
        .at(0)
        .text(),
    ).toEqual('1860-200-3456');

    expect(continueComp.find('button').text()).toEqual('Continue');
  });
});
