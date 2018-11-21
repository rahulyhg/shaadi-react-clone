/* eslint camelcase: 0 */
import React from 'react';
import { mount } from 'enzyme';
import factory from './factory';
import SearchGroups from '../../SearchGroups';
import { getGroupItemsInfo, getExceptionInfo } from '../utils';

jest.mock('../../Common/Link');

describe('Discover  and intents Landing cases', () => {
  const onAction = jest.fn();
  const daTracking = jest.fn();
  Object.keys(factory.searchResult).forEach(grpType => {
    factory.searchResult[grpType].forEach(sResult => {
      const discoverProps = (Result, searchType) => ({
        ...factory.props,
        searchType,
        searchResult: { ...factory.props.searchResult, ...Result, category: searchType, count: Result.items.length },
        onAction,
        daTracking,
      });
      factory[grpType].forEach(type => {
        describe(`discover category :${type}`, () => {
          const props = discoverProps(sResult, type);

          if (factory.intentsType.includes(type) && props.searchResult.response_type === 'viewed') {
            props.searchResult.response_type = 'unviewed';
          }
          const response_type = props.searchResult.remark.messageCode || props.searchResult.response_type;
          switch (response_type) {
            case 'viewed': {
              props.headerInfo = { type: `${type}_viewed` };
              const searchInfo = getGroupItemsInfo(props.headerInfo);
              describe(`should render ${type} Viewed Block`, () => {
                const searchGp = mount(<SearchGroups {...props} />);
                it('Must have proper viewed message', () => {
                  expect(searchGp.text()).toContain(
                    'Looks like you have viewed all the matches here,but some of them are definitely worth a second look!',
                  );
                });
                const links = searchGp.find('a');
                it('View must show first 2 profile images  and count(if required) ', () => {
                  if (props.searchResult.items.length <= 2) {
                    expect(links).toHaveLength(props.searchResult.items.length);
                  } else {
                    expect(links).toHaveLength(3);
                    expect(links.last().text()).toMatch(/^\+[1-9]?[0-9]+/);
                  }
                });
                it('Should have proper redirection', () => {
                  links.forEach(node => {
                    expect(node.props().href).toMatch(new RegExp(`${searchInfo.viewed_link}$`));
                  });
                });
              });
              break;
            }

            case 'unviewed': {
              describe(`should render  ${type} UnViewed Block`, () => {
                props.headerInfo = { type };
                const searchGp = mount(<SearchGroups {...props} />);
                let links = searchGp.find('a').filterWhere(node => node.text() === 'See All');
                if (type === 'shortlisted') {
                  links = searchGp.find('a').filterWhere(node => node.text() === 'View all your Shortlists');
                }
                const text = links.props().href.substring(links.props().href.indexOf('?') + 1);
                it('Must have Only one " See All " link', () => {
                  expect(links).toHaveLength(1);
                });
                it('" See All " link must have PG Search Result Id with  proper value', () => {
                  expect(text).toMatch(/^pg_searchresults_id/);
                  const resultId = text.substring(text.indexOf('=') + 1);
                  expect(resultId).toBe(props.searchResult.results_id);
                });
              });
              break;
            }
            default: {
              describe('Should Render exception component with guiding user info', () => {
                it('should have proper message', () => {
                  if (props.searchResult.response_type === 'viewed') {
                    props.headerInfo = { type: `${type}_viewed` };
                  } else {
                    props.headerInfo = { type };
                  }
                  const searchInfo = getGroupItemsInfo(type);
                  const exceptionInfo = getExceptionInfo(response_type, props.headerInfo.type);

                  const exceptionProp = { ...props, ...searchInfo, ...exceptionInfo, exceptionType: response_type };
                  mount(<SearchGroups {...exceptionProp} />);
                });
              });
            }
          }
        });
      });
    });
  });
});
