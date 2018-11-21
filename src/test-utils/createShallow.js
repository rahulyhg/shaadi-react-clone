import { shallow as enzymeShallow } from 'enzyme';
import { createRenderer } from 'fela';
import { createTheme } from 'fela-bindings';
import theme from '../theme/felaTheme';

const createShallow = (node, options = {}) => {
  const renderer = createRenderer();
  const component = enzymeShallow(node, {
    context: {
      renderer,
      theme: createTheme(theme),
    },
    ...options,
  });

  return component;
};

export default createShallow;
