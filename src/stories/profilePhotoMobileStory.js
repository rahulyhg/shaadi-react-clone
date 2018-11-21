/* eslint-disable */
import React from 'react';

import { storiesOf } from '@storybook/react';

import ProfilePhotoMobile from '../mComponents/Common/ProfilePhotoMobile';
import props, { albumStatuses, statusProps } from '../fixtures/profilePhotoMobileFixture';
import MobileDecorator from './decorators/mobileDecorator';

const stories = storiesOf('ProfilePhotoMobile Component', module)
  .addDecorator(story =>
    <MobileDecorator>
      {story()}
    </MobileDecorator>,
  )
  .add('with photoCount', () => <ProfilePhotoMobile albumStatus='default' photoCount={3} photo="https://images-na.ssl-images-amazon.com/images/M/MV5BMjUzZTJmZDItODRjYS00ZGRhLTg2NWQtOGE0YjJhNWVlMjNjXkEyXkFqcGdeQXVyMTg4NDI0NDM@._V1_UY256_CR42,0,172,256_AL_.jpg" />)

albumStatuses.forEach(albumStatus => stories.add(`with status: ${albumStatus}`, () =>
  <ProfilePhotoMobile albumStatus={albumStatus} {...props} {...statusProps[albumStatus]} />));
