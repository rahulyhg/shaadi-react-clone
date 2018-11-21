/* eslint-disable-file */
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider as FelaProvider, ThemeProvider } from 'react-fela';
import { createRenderer } from 'fela';

import store from '../store';
import felaTheme from '../theme/felaTheme';
import { BuddyListPage } from '../pages/BuddyListPage/mobile';
import props from '../fixtures/buddyListPageMobile';
import { storiesOf } from '@storybook/react'; //eslint-disable-line

const renderer = createRenderer();

storiesOf('BuddyListPageMobile', module)
  .addDecorator(story => (
    <ReduxProvider store={store}>
      <Router>
        <FelaProvider renderer={renderer}>
          <ThemeProvider theme={felaTheme}>
            <div style={{ width: 420, fontFamily: 'sans-serif' }}>{story()}</div>
          </ThemeProvider>
        </FelaProvider>
      </Router>
    </ReduxProvider>
  ))
  .add('with props', () => <BuddyListPage {...props} />)
  .add('no buddy list', () => <BuddyListPage {...props} items={{ accepted: [], matches: [], shortlisted: [] }} />);
