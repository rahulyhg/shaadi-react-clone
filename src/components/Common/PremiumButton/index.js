import React from 'react';
import PropTypes from '../../../PropTypes';
import Loader from '../../Common/Loader';
import s from './styles';

class PremiumButton extends React.Component {
  state = {
    loading: false,
  };

  componentWillReceiveProps(props) {
    if (props.eoiClose) {
      this.setState({ loading: false });
    }
  }

  buttonClick = e => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.props.connectPremiumCarousel(e);
    }, 500);
  };

  render() {
    const { loading } = this.state;
    return (
      <React.Fragment>
        {!loading ? (
          <s.ConnectNow isSubmit={loading} btnType={'connect'}>
            <s.ConnectInner isSubmit={loading} onClick={this.buttonClick} btnText={'Connect Now'} btnType={'connect'} />
          </s.ConnectNow>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}
PremiumButton.defaultProps = {};

PremiumButton.propTypes = {
  connectPremiumCarousel: PropTypes.func.isRequired,
  eoiClose: PropTypes.bool.isRequired,
};
export default PremiumButton;
