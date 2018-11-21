import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs/react';
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import initializeStore from '../../store';
import LightBox from '../../components/Modal/lightBox';
import UploadPhoto from '../../components/Modal/uploadPhoto';
import props from './factory';

const store = initializeStore();

const shouldShowAlbum = ({ isPaidUser, hasUploadedPhoto }, connectionStatus) =>
  isPaidUser || hasUploadedPhoto || ['theyAccepted', 'theyContacted', 'accepted'].includes(connectionStatus);
const lightBox = () => {
  storiesOf('LightBox', module)
    .addDecorator(withKnobs)
    .addDecorator(story => (
      <Provider store={store}>
        <Router>
          <Switch>{story()}</Switch>
        </Router>
      </Provider>
    ))
    .add('Light Box', () => {
      const isPaidUser = boolean('Premium Member', true);
      const hasUploadedPhoto = boolean('Member uploaded Photo', true);
      const connectionAction = {
        contacted: 'contacted',
        theyAccepted: 'theyAccepted',
        theyDeclined: 'theyDeclined',
        cancelled: 'cancelled',
        theyContacted: 'theyContacted',
        accepted: 'accepted',
      };
      const connectionStatus = select('Connection Status', connectionAction, 'member_contacted');
      const showAlbum = shouldShowAlbum({ isPaidUser, hasUploadedPhoto }, connectionStatus);

      return showAlbum ? <LightBox {...props.album} /> : <UploadPhoto {...props.uploadPhoto} />;
    });
};

export { lightBox };
