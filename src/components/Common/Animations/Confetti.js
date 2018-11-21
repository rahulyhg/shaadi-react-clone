import PropTypes from 'prop-types';
import React from 'react';
import sizeMe from 'react-sizeme';
import Confetti from 'react-confetti';

const ConfettiAnimation = sizeMe({
  monitorHeight: true,
  monitorWidth: true,
})(
  class ConfettiAnimation extends React.PureComponent {
    static propTypes = {
      size: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
      }),
    };

    static defaultProps = {
      size: {
        width: '100%',
        height: '100%',
      },
    };

    render() {
      return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '60%' }}>
          <Confetti {...this.props.size} gravity={0.2} numberOfPieces={0} recycle={false} />
        </div>
      );
    }
  },
);

export default ConfettiAnimation;
