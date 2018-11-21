import React from 'react';
import renderer from 'react-test-renderer';
import Timer from '../timer';
import factory from './utils/factory';

describe('Timer : ', () => {
  const props = { ...factory.timerProps };
  describe('Timer Render: ', () => {
    const timerProps = {
      ...props,
      time: 2,
      loader: <div>loader</div>,
      response: <div>response!</div>,
    };

    it('Timer Redirect : Response ', done => {
      const tree = renderer.create(<Timer {...timerProps} />);
      expect(tree.toJSON()).toMatchSnapshot();
      setTimeout(() => {
        expect(tree.toJSON()).toMatchSnapshot();
        done();
      }, 2500);
    });
  });
});
