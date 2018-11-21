/* eslint-disable */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { LayerPartial } from '../partials/LayerPartial/mobile';
import modalProps from '../fixtures/factories/modal';
import MobileDecorator from './decorators/mobileDecorator';

const props = modalProps();

storiesOf('MobileLayer Partial', module)
  .addDecorator(story =>
    <MobileDecorator>
      {story()}
    </MobileDecorator>,
  )
  .add('template: upgrade', () =>
    <LayerPartial {...props} template="upgrade" />,
  )
  .add('template: commonInterests', () =>
    <LayerPartial {...props} template="commonInterests" />,
  )
  .add('template: viewContactConfirm', () =>
    <LayerPartial {...props} template="viewContactConfirm" />,
  )
  .add('template: viewContact with loading', () => {
      props.contactDetails.loading = true;
      return <LayerPartial {...props} template="contactDetails" />
    },
  ).
  add('template: viewContact with mobile hidden', () => {
      props.contactDetails.loading = false;
      return <LayerPartial {...props} template="contactDetails" />
    },
  ).
  add('template: viewContact with mobile visible', () => {
      props.contactDetails.loading = false;
      props.contactDetails.mobileStatus = 'visible';
      return <LayerPartial {...props} template="contactDetails" />
    },
  );
