import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import RevampProduct from '../../components/Payment/RevampPaymentPage/RevampProduct';
import PremiumProducts from '../../components/Payment/RevampPaymentPage/PremiumProducts';
import PersonalisedProducts from '../../components/Payment/RevampPaymentPage/PersonalisedProducts';

import props from './factory';

const revampPaymentPage = () => {
  storiesOf('Revamp Payment Page', module)
    .addDecorator(withKnobs)
    .addDecorator(story => story())
    .add('Gold Product', () => <RevampProduct {...props.goldProps} />)
    .add('Gold Plus Product', () => <RevampProduct {...props.goldPlusProps} />)
    .add('Diamond Product', () => <RevampProduct {...props.diamondProps} />)
    .add('Diamond Plus Product', () => <RevampProduct {...props.diamondPlusProps} />)
    .add('Platinum Plus Product', () => <RevampProduct {...props.platinumPlusProps} />)
    .add('Your Plan + Selected Product', () => (
      <div style={{ textAlign: 'center', marginTop: '29px' }}>
        <RevampProduct {...props.yourPlanProps} />
      </div>
    ))
    .add('Select (3 month) Product', () => <RevampProduct {...props.selectThreeMonthProps} />)
    .add('Select (6 month) Product', () => <RevampProduct {...props.selectSixMonthProps} />)
    .add('Premium Products', () => (
      <div style={{ textAlign: 'center', marginTop: '189px' }}>
        <PremiumProducts {...props.allProductsProps} />
      </div>
    ))
    .add('Personalised Products', () => <PersonalisedProducts {...props.allPersonalisedProductsProps} />);
};

export { revampPaymentPage };
