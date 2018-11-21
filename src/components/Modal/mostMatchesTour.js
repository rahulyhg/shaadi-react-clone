import React from 'react';
import PropTypes from 'prop-types';
import Joyride from 'react-joyride';

class MostMatchesTour extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onTourEvent = this.onTourEvent.bind(this);
    this.config = {
      autoStart: true,
      running: true,
      steps: [
        {
          title: `We have turned on this feature so you get more Matches.`,
          text: 'Some Matches may not meet ALL your Preferences.',
          textAlign: 'center',
          selector: '.matchesTourWrap',
          position: 'bottom-left',
          style: {
            backgroundColor: 'transparent',
            borderRadius: '0',
            color: '#f0f0f0',
            mainColor: '#ff4456',
            textAlign: 'left',
            width: '420px',
            title: {
              fontWeight: '300',
              fontSize: '16px',
              lineHeight: '24px',
              textAlign: 'left',
            },
            main: {
              width: '524px',
              padding: '12px 0 18px 0',
            },
            hole: {
              borderRadius: '0',
              boxShadow: '0 0 0 9999px rgba(0,0,0,.75), 0 0 15px rgba(0,0,0,.75)',
            },
            header: {
              fontWeight: '300',
              fontSize: '16px',
              lineHeight: '24px',
              border: 'none',
              backgroundImage: `url(${'https://img2.shaadi.com/assests/2017/images/tour-sprite-v8.png)'}`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '273px -1101px',
              padding: '75px 0px 0px 0',
              margin: '-70px 0 0 0',
            },
            button: {
              padding: '6px 20px',
              fontSize: '18px',
              lineHeight: '32px',
              boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)',
              backgroundColor: '#00bcd5',
              borderRadius: '3px',
              color: '#fff',
            },
            close: {
              display: 'none',
            },
            footer: {
              textAlign: 'left',
              margin: '0',
            },
          },
        },
      ],
      step: 0,
    };
  }

  componentDidMount() {
    this.props.onInit();
  }

  onTourEvent({ type }) {
    if (type === 'finished') {
      this.props.onModalClose();
    }
  }

  render() {
    if (this.props.data.loading) return null;
    return (
      <Joyride
        ref={c => (this.joyride = c)} // eslint-disable-line no-return-assign
        debug={false}
        disableOverlay
        locale={{ last: <span>Ok, got it</span>, back: 'Back', close: 'Ok, got it', next: 'Next', skip: 'Skip' }}
        stepIndex={this.config.step}
        run={this.config.running}
        showOverlay={'active'}
        showSkipButton={false}
        showStepsProgress={false}
        steps={this.config.steps}
        callback={this.onTourEvent}
        type="single"
        autoStart={this.config.autoStart}
        keyboardNavigation={false}
      />
    );
  }
}

MostMatchesTour.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  onInit: PropTypes.func.isRequired,
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
  }).isRequired,
};

export default MostMatchesTour;
