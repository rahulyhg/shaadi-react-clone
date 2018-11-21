/* eslint-disable */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { Provider, ThemeProvider } from 'react-fela';
import { createRenderer } from 'fela';

import felaTheme from '../theme/felaTheme';
import EoiMobile from '../mComponents/EoiMobile';
import props, { connectionStatusArr } from '../fixtures/eoiMobileFixture';

const renderer = createRenderer();

const stories = storiesOf('EoiMobile Component', module)
  .addDecorator(story =>
    <Provider renderer={renderer}>
      <ThemeProvider theme={felaTheme}>
        <div style={{width: 420, fontFamily: 'sans-serif', backgroundColor: 'black'}}>
          {story()}
        </div>
      </ThemeProvider>
    </Provider>,
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
