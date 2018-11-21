/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRenderer } from 'fela';
import { mount } from 'enzyme';
import { Provider as FelaProvider, ThemeProvider } from 'react-fela';
import felaTheme from '../../../theme/felaTheme';
import initializeStore from '../../../store';
import InboxPage from '../mobile';
import { Filter } from '../stylesMobile';
import { formInboxFactory } from './utils/inboxFactory';

const store = initializeStore();

const renderer = createRenderer();
describe('Inbox', () => {
  describe('invites', () => {
    const onAction = jest.fn();
    const { props, config } = formInboxFactory('connect_pending');
    const InboxProps = {
      ...props,
      onInboxInit: onAction,
      doProfileAction: onAction,
      doModalAction: onAction,
    };
    const invites = mount(
      <Provider store={store}>
        <FelaProvider renderer={renderer}>
          <ThemeProvider theme={felaTheme}>
            <Router>
              <InboxPage.WrappedComponent {...InboxProps} />
            </Router>
          </ThemeProvider>
        </FelaProvider>
      </Provider>,
    );
    describe('Rendering ', () => {
      it('Should have relevant page heading with count Info', () => {
        const title = invites.find('title').text();
        expect(title).toBe(
          `${config.Title} ${(props.meta.listCount &&
            props.meta.listCount[props.listType] &&
            `(${props.meta.listCount[props.listType]})`) ||
            ''}`,
        );
      });
      it('Should have filters', () => {
        expect(invites.find(Filter).length).toBe(1);
      });
    });

    describe('interactions', () => {
      describe('Filters', () => {
        it('Should open Filter modal box', () => {
          invites.find(Filter).simulate('click');
          expect(onAction).toHaveBeenCalled();
        });
      });
    });
  });
});
