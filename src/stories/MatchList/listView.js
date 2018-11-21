import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import { withKnobs, boolean } from '@storybook/addon-knobs/react';
import initializeStore from '../../store';
import ListItem from '../../components/MatchList/MatchItem/ListItem';
import props from './factory';

const store = initializeStore();

const listItemSb = () => {
  storiesOf('MatchList List View', module)
    .addDecorator(withKnobs)
    .addDecorator(story => (
      <Provider store={store}>
        <Router>
          <Switch>{story()}</Switch>
        </Router>
      </Provider>
    ))
    .add('0 To 7 New Match Masked Exp', () => {
      const isHover = boolean('Click & hover on Profile', false);

      const propsArr = {
        ...props,
        isNewMatchHovered: isHover,
        profile: {
          ...props.profile,
          flags: {
            ...props.profile.flags,
          },
        },
      };

      return <ListItem {...propsArr} />;
    });
};

export { listItemSb };
