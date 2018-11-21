import { Reducer } from 'redux-testkit';
import itemsReducer from '../items';
import factory from './utils/factory';

const itemFactory = factory.items;

describe('reducer contactSummary', () => {
  describe('items', () => {
    it('return default state no action', () => {
      const state = Reducer(itemsReducer).execute({});
      expect(factory.itemsState.items).toMatchObject(state);
    });
    it('return when conatct summary data fail', () => {
      const state = Reducer(itemsReducer).execute(itemFactory.getAction('CONTACT_SUMMARY_DATA_FAIL', {}));
      expect(factory.itemsState.items).toMatchObject(state);
    });

    it('return when conatct summary data request', () => {
      const state = Reducer(itemsReducer).execute(
        itemFactory.getAction('CONTACT_SUMMARY_DATA_REQUEST', {
          data: {
            file_extension: 'webp',
            page: 1,
            pages: 0,
            request_id: 'eyJ0IjoxNTE5NDA5NzIzNDM3fQ==',
            results_id: '',
            t: 1519409723437,
            total: 0,
          },
        }),
      );
      expect(factory.itemsState.items).toMatchObject(state);
    });

    it('return when conatct summary data request', () => {
      const state = Reducer(itemsReducer).execute(
        itemFactory.getAction('CONTACT_SUMMARY_DATA_SUCCESS', {
          profiles: [{ uid: 'ESH69905149' }],
        }),
      );
      expect(factory.dataSuccess.items).toMatchObject(state);
    });

    it('return when click view sms', () => {
      const state = Reducer(itemsReducer).execute(
        itemFactory.getAction('CONTACT_SUMMARY_VIEW_SMS_SHOW_SUCCESS', {
          uid: 'ESH69905149',
          items: [
            {
              uid: 'ESH69905149',
              justNow: false,
              photoLoading: false,
              changeCursorStatus: true,
              displayStatusMessage: '',
              viewSmsShowStatus: false,
            },
          ],
        }),
      );
      expect(factory.showHideViewSms.items).toMatchObject(state);
    });
    it('when photo eoi success', () => {
      const state = Reducer(itemsReducer).execute(
        itemFactory.getAction('PHOTO_EOI_SUCCESS', {
          albumStatus: 'photoRequestSent',
          source: 'contactSummary',
          type: 'requestPhoto',
          uid: 'ESH69905149',
        }),
      );
      expect(factory.itemsState.items).toMatchObject(state);
    });
    it('when photo eoi request', () => {
      const state = Reducer(itemsReducer).execute(
        itemFactory.getAction('PHOTO_EOI_REQUEST', {
          source: 'contactSummary',
          type: 'requestPhoto',
          uid: 'ESH69905149',
        }),
      );
      expect(factory.itemsState.items).toMatchObject(state);
    });
    it('when photo eoi fail', () => {
      const state = Reducer(itemsReducer).execute(
        itemFactory.getAction('PHOTO_EOI_FAIL', {
          error: {
            message: 'profile_hidden',
            status: 400,
            type: 'formatted',
          },
          source: 'contactSummary',
          type: 'requestPhoto',
          uid: 'ESH69905149',
        }),
      );
      expect(factory.itemsState.items).toMatchObject(state);
    });

    it('when show tooltip', () => {
      const state = Reducer(itemsReducer).execute(
        itemFactory.getAction('ALERT_SHOW', {
          body: [
            {
              items: [
                {
                  key: 's-0.0',
                  text: 'You cannot send a photo request as this Profile is hidden.',
                  type: 'text',
                  url: null,
                },
              ],
              key: 'para-0',
            },
          ],
          key: '-contactSummary-photo-uid-KSH26395859--1519415185557',
          loading: false,
          page: 'contactSummary',
          params: { uid: 'KSH26395859' },
          position: 'photo',
          title: null,
        }),
      );
      expect(factory.itemsState.items).toMatchObject(state);
    });
    it('when hide tooltip', () => {
      const state = Reducer(itemsReducer).execute(
        itemFactory.getAction('ALERT_HIDE', {
          page: 'any',
          positions: ['photo', 'eoi'],
        }),
      );
      expect(factory.itemsState.items).toMatchObject(state);
    });
    it('when hide key tooltip', () => {
      const state = Reducer(itemsReducer).execute(
        itemFactory.getAction('ALERT_HIDE_KEY', {
          key: '-contactSummary-photo-uid-KSH26395859--1519415185557',
        }),
      );
      expect(factory.itemsState.items).toMatchObject(state);
    });
  });
});
