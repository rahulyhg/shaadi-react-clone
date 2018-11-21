/* eslint prefer-template: 0 */
import React from 'react';
import PropTypes from '../../../PropTypes';
import s from './styles';

class ReportPhoneNo extends React.PureComponent {
  state = {
    radioInputValue: 'married',
  };

  onReportMisuse = event => {
    event.preventDefault();
    this.props.doProfileAction('modal/reportMisusePhone', this.props.data.uid, 'reportPhoneMisuse', { reason: this.state.radioInputValue });
  };

  handleChange = event => {
    this.setState({
      radioInputValue: event.target.value,
    });
  };
  render() {
    const reportMisuseArr = [
      {
        option: 'married',
        value: 'Married / Engaged',
      },
      {
        option: 'wrongno',
        value: 'Wrong Number',
      },
      {
        option: 'unreachable',
        value: 'Not Reachable',
      },
    ];

    if (this.props.data.flash) {
      return (
        <s.ContactDetails>
          <s.ContactHeader />
          <s.ContactInner>{this.props.data.flash}</s.ContactInner>
          <s.ContactCloseModalBtn onClick={this.props.onModalClose} />
        </s.ContactDetails>
      );
    }

    return (
      <s.ContactDetails>
        <s.ContactHeader />
        <form className="container" onSubmit={this.onReportMisuse}>
          <s.ContactInner>
            <s.ResonText>Reason for reporting Phone Number</s.ResonText>
            <s.ResonSelectWrp>
              {reportMisuseArr.map(reason => (
                <s.ResonSelect key={reason.option}>
                  <s.ResonSelectInput
                    type="radio"
                    value={reason.option}
                    checked={this.state.radioInputValue === reason.option}
                    onChange={this.handleChange}
                  />
                  {reason.value}
                </s.ResonSelect>
              ))}
            </s.ResonSelectWrp>
          </s.ContactInner>
          <s.SubmitWrp>
            <s.SendSMSBtn>Submit</s.SendSMSBtn>
          </s.SubmitWrp>
        </form>
        <s.ContactCloseModalBtn onClick={this.props.onModalClose} />
      </s.ContactDetails>
    );
  }
}

ReportPhoneNo.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  doProfileAction: PropTypes.func.isRequired,
  data: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    flash: PropTypes.string,
  }).isRequired,
};

export default ReportPhoneNo;
