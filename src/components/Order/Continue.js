import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';
import SvgLoader from '../Common/SvgLoader';

class Continue extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  myHandler = (e, wwwBaseUrl) => {
    this.setState({ loading: true });
    window.location.href = `${wwwBaseUrl}/my-shaadi`;
  };

  render() {
    const buttonText = 'Continue';

    return (
      <React.Fragment>
        <s.Divider />
        <s.ContinueMessage>Start searching and connecting with your potential partners right away.</s.ContinueMessage>
        <s.Button id="data_test_continue_btn" onClick={e => this.myHandler(e, this.props.wwwBaseUrl)}>
          {!this.state.loading && buttonText}
          {this.state.loading && <SvgLoader isVisible isPaymentLoader isPremiumCarousel />}
        </s.Button>
        <s.HelpText id="data_test_tollfree">
          {this.props.crmNo && `For help call us on`}
          <br />
          <s.ContactNo>{this.props.crmNo}</s.ContactNo>
        </s.HelpText>
      </React.Fragment>
    );
  }
}
Continue.propTypes = {
  wwwBaseUrl: PropTypes.string.isRequired,
  crmNo: PropTypes.string.isRequired,
};
export default Continue;
