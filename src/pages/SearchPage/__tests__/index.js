import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRenderer } from 'fela';
import { shallow } from 'enzyme';
import { Provider as FelaProvider, ThemeProvider } from 'react-fela';
import felaTheme from '../../../theme/felaTheme';
import store from '../../../store';
import Pagination from '../../../mComponents/Pagination';
import Toast from '../../../mComponents/Common/Toast';
import SearchPage from '../mobile'; // eslint-disable-line import/no-named-as-default
import pageProps from './factory';

const renderer = createRenderer();
const mockedFn = jest.fn();
describe('OtherSearches', () => {
  const pageProp = {
    doProfileAction: mockedFn,
    doOtherSearch: mockedFn,
    ...pageProps,
  };
  const searchComp = shallow(
    <Provider store={store}>
      <FelaProvider renderer={renderer}>
        <ThemeProvider theme={felaTheme}>
          <Router>
            <SearchPage.WrappedComponent {...pageProp} />
          </Router>
        </ThemeProvider>
      </FelaProvider>
    </Provider>,
  );
  it('No pagination when List consumed in single page ', () => {
    expect(searchComp.find(Pagination).length).toBe(0);
  });
  it('should not  show toast section,without any user action', () => {
    expect(searchComp.find(Toast).length).toBe(0);
  });
});
