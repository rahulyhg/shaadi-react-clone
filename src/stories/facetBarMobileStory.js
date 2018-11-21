/* eslint-disable */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { Provider, ThemeProvider } from 'react-fela';
import { createRenderer } from 'fela';
import Divider from '@material-ui/core/Divider';
import felaTheme from '../theme/felaTheme';

import props from '../fixtures/facetBarFixture';
import FacetBarMobile, { FacetItem } from '../mComponents/FacetBarMobile';

const renderer = createRenderer();

storiesOf('FacerBarMobile Component', module)
  .addDecorator(story =>
    <Provider renderer={renderer}>
      <ThemeProvider theme={felaTheme}>
        <div style={{width: 420, height: '500px', overflow: 'hidden'}}>
          {story()}
          <style dangerouslySetInnerHTML={{__html: `
            body { margin: 0; font-family: sans-serif; }
            `}} />
        </div>
      </ThemeProvider>
    </Provider>,
  )
  .add('with props', () => (
    <FacetBarMobile>
      {props.facets.map(facet => (
        <div key={facet.key}>
          <FacetItem {...facet} />
          <Divider light />
        </div>
      ))}
    </FacetBarMobile>
  ))
