import React from 'react';
import PropTypes from '../../../../PropTypes';
import Loader from '../../../Common/Loader';
import s from '../../../Common/PremiumButton/styles';

class PremiumCarousel extends React.Component {
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
      this.props.onAcceptPremiumCarousel(e);
    }, 500);
  };

  render() {
    const { loading } = this.state;
    return (
      <React.Fragment>
        {!loading ? (
          <s.ConnectNow isSubmit={loading} btnType={'accept'}>
            <s.ConnectInner isSubmit={loading} onClick={this.buttonClick} btnText={'Accept'} btnType={'accept'} />
          </s.ConnectNow>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

PremiumCarousel.propTypes = {
  onAcceptPremiumCarousel: PropTypes.func.isRequired,
  eoiClose: PropTypes.bool.isRequired,
};

export default PremiumCarousel;
