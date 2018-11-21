import React from 'react';
import PropTypes from '../../../PropTypes';
import s from './styles';

class VerificationShield extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDetailsVisible: false,
    };
    this.onToggleDetails = this.onToggleDetails.bind(this);
  }

  onToggleDetails() {
    const isDetailsVisible = !this.state.isDetailsVisible;
    this.setState({ isDetailsVisible });
  }

  onSheildBlur(event) {
    setTimeout(() => {
      this.onToggleDetails();
    }, 100);
  }

  render() {
    return (
      <s.VerificationBoxWrap>
        <s.ShieldIcon
          shieldView={this.props.verification.shield_state.toLowerCase()}
          onMouseOver={() => this.onToggleDetails()}
          onMouseLeave={e => this.onSheildBlur(e)}
          source={this.props.source}
        />
        <s.VerificationBox isVisible={this.state.isDetailsVisible} source={this.props.source}>
          <s.BoxPointerTop />
          {this.props.verification.verified_proofs.map(item => (
            <s.VerifiedText key={item}>
              <s.VerifiedTick />
              {item}
            </s.VerifiedText>
          ))}
        </s.VerificationBox>
      </s.VerificationBoxWrap>
    );
  }
}

VerificationShield.defaultProps = {
  source: '',
};

VerificationShield.propTypes = {
  verification: PropTypes.shape({
    count: PropTypes.number,
    shield_state: PropTypes.string,
    derived_text: PropTypes.string,
    verified_proofs: PropTypes.array,
  }).isRequired,
  source: PropTypes.string,
};

export default VerificationShield;
