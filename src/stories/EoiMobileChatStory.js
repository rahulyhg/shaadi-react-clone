/* eslint-disable */
import React from 'react';

import { storiesOf } from '@storybook/react';
import EoiMobile from '../mComponents/EoiMobile/EoiMobileChat';
import props, { connectionStatusArr } from '../fixtures/eoiMobileFixture';
import MobileDecorator from './decorators/mobileDecorator';

const stories = storiesOf('EoiMobileChat Component', module)
  .addDecorator(story =>
    <MobileDecorator>
      {story()}
    </MobileDecorator>,
  )

connectionStatusArr.forEach(connectionStatus =>
  stories.add(`free user ${connectionStatus}`, () => <EoiMobile {...props} connectionStatus={connectionStatus} />)
)

connectionStatusArr.forEach(connectionStatus =>
  stories.add(`vip user ${connectionStatus}`, () => <EoiMobile {...props} connectionStatus={connectionStatus} membershipLevel="vip" />)
)

connectionStatusArr.forEach(connectionStatus =>
  stories.add(`premium user ${connectionStatus}`, () => <EoiMobile {...props} connectionStatus={connectionStatus} membershipLevel="premium" />)
)
