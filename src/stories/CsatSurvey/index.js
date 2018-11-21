import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import { withKnobs } from '@storybook/addon-knobs/react';
import initializeStore from '../../store';
import CsatSurvey from '../../components/Common/Survey/CsatSurvey';
import data from './factory';

const store = initializeStore();

const csatSurvey = () => {
  storiesOf('Stop Page', module)
    .addDecorator(withKnobs)
    .addDecorator(story => (
      <Provider store={store}>
        <Router>
          <Switch>{story()}</Switch>
        </Router>
      </Provider>
    ))
    .add('CSAT Survey', () => <CsatSurvey {...data} />);
};

export { csatSurvey };
