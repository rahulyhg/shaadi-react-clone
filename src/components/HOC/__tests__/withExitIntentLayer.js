import React from 'react';
import { mount } from 'enzyme';
import withExitIntentLayer from '../withExitIntentLayer';

const testComponent = () => <div />;
const CompnentFromHOC = withExitIntentLayer(testComponent);

const mockedShowExitIntentLayer = jest.fn();

describe('Exit Intent Layer ', () => {
  const props = {
    user: {
      uid: 'eSH25162570',
      gender: 'Male',
    },
    showExitIntentLayer: mockedShowExitIntentLayer,
  };
  const mountedComponent = mount(<CompnentFromHOC {...props} />);
  describe('Exit Intent Should mount', () => {
    it('should mount', () => {
      expect(mountedComponent).toHaveLength(1);
    });
    describe('on mouse leave from window', () => {
      mountedComponent.instance().checkExitIntent({ clientY: 0 });
      it('exit intent layer to show function to be called', () => {
        expect(mockedShowExitIntentLayer).toHaveBeenCalled();
      });
      it('should unmount', () => {
        const mock = jest.fn().mockReturnValue('be mocked');
        mountedComponent.instance().componentWillUnmount = mock;
        mountedComponent.unmount();
        expect(mock).toHaveBeenCalled();
      });
    });
  });
});
