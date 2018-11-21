import React from 'react';
import { mount } from 'enzyme';
import deepExtend from 'deep-extend';
import Eoi from '../../../Eoi';
import factory from '../utils/factory';
import Timer from '../../../../../helpers/timer';

jest.mock('../../../Link');

describe('Eoi search connectionStatus: contacted', () => {
  const onAction = jest.fn();
  factory.profiles.forEach(profile => {
    describe(profile.name, () => {
      const eoiProps = (type, over = {}) => ({ type, profile: deepExtend({}, profile, over), ...factory.props, onAction });
      beforeEach(() => {
        onAction.mockClear();
      });

      describe('type: list', () => {
        const props = eoiProps('list', { flags: { connectionStatus: 'contacted' } });
        it('should render awaiting response', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(
            eoi
              .find('span')
              .first()
              .text(),
          ).toContain('Invitation sent.');
        });

        it('on connect for diamond or platinum plus member should render response', () => {
          const eoiData = eoiProps('list', {
            flags: { connectionStatus: 'contacted', canCommunicate: true, membershipTags: 'diamond_plus' },
          });
          const eoi = mount(<Eoi {...eoiData} />);
          expect(
            eoi
              .find('span')
              .first()
              .text(),
          ).toContain('Invitation sent.');
        });

        it('For premium  User view contact button enable', () => {
          const premProps = deepExtend(
            {},
            eoiProps('list', { flags: { connectionStatus: 'contacted', canCommunicate: false, membershipTags: 'diamond_plus' } }),
            {
              settings: { isPaidUser: true },
            },
          );
          const eoi = mount(<Eoi {...premProps} />);
          expect(eoi.find('[data-viewcontact=true]').exists()).toBe(true);
        });

        it('For sku experiment view contact button enable', () => {
          const skuProps = deepExtend(
            {},
            eoiProps('list', { flags: { connectionStatus: 'contacted', canCommunicate: true, membershipTags: 'diamond_plus' } }),
            {
              settings: { isPaidUser: false },
            },
          );
          const eoi = mount(<Eoi {...skuProps} />);
          expect(eoi.find('[data-viewcontact=true]').exists()).toBe(true);
        });

        it('should render awaiting response', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(
            eoi
              .find('span')
              .first()
              .text(),
          ).toContain(`contact ${props.profile.himHer.toLowerCase()} directly`);
        });
      });

      describe('type: grid', () => {
        const props = eoiProps('grid', { flags: { connectionStatus: 'contacted' } });
        it('should render awaiting response', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(
            eoi
              .find('div')
              .last()
              .text(),
          ).toBe('Awaiting Response');
        });
      });
      describe('type:premiumCarousel', () => {
        const props = eoiProps('premiumCarousel', { flags: { connectionStatus: 'contacted' } });
        it('should render Connected', () => {
          const eoi = mount(<Eoi {...props} />);
          expect(eoi.find(Timer).get(0)).toBeTruthy();
        });
      });
    });
  });
});
