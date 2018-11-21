import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { mount as enzymeMount } from 'enzyme';
import { createRenderer } from 'fela';
import { renderToString } from 'fela-tools';
import { Provider, ThemeProvider } from 'react-fela';
import felaTheme from '../theme/felaTheme';

const createMount = (node, options1 = {}) => {
  const { mount = enzymeMount, ...other1 } = options1;

  const attachTo = window.document.createElement('div');
  attachTo.className = 'app';
  attachTo.setAttribute('id', 'app');
  window.document.body.insertBefore(attachTo, window.document.body.firstChild);

  const renderer = createRenderer();

  const mountWithContext = (node2, options2) => {
    const component = mount(
      <Provider renderer={renderer}>
        <ThemeProvider theme={felaTheme}>{node2}</ThemeProvider>
      </Provider>,
      {
        attachTo,
        ...other1,
        ...options2,
      },
    );

    component.styles = renderToString(renderer);
    return component;
  };

  mountWithContext.attachTo = attachTo;
  mountWithContext.cleanUp = () => {
    unmountComponentAtNode(attachTo);
    attachTo.parentNode.removeChild(attachTo);
  };

  return mountWithContext;
};

export default createMount;
