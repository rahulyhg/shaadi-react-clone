import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';
import ss from '../styles';

class BlockMember extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      reportMisuse: false,
      reason: null,
      message: '',
      placeholder: '',
    };
    this.renderMaxRequestsSection = this.renderMaxRequestsSection.bind(this);

    this.toggleMisuse = () => this.setState({ reportMisuse: !this.state.reportMisuse });
    this.onConfirm = this.onConfirm.bind(this);
  }

  onConfirm() {
    this.props.onAction('block_confirm', this.props.data.uid, this.state.reportMisuse, { data: this.props.data });
  }

  renderMaxRequestsSection(props) { //eslint-disable-line
    const headerMap = {
      reportMisuse_confirm: 'Report Misuse',
      block: 'Block',
      default: 'Block',
    };
    return (
      <s.BlockMember>
        <Header title={`${headerMap[props.data.type || 'default']} ${this.props.data.name}`} onModalClose={props.onModalClose} />
        <ss.Content>
          <s.BlockMessage color>
            You cannot Block or Report more than 20 Members in a single day. Please try again after 24 hours.
          </s.BlockMessage>
        </ss.Content>
      </s.BlockMember>
    );
  }

  render() {
    if (this.props.data.hasExceededMaxRequests) {
      return this.renderMaxRequestsSection(this.props);
    }
    if (!this.props.data.uid) {
      return (
        <s.BlockMember>
          <Header onModalClose={this.props.onModalClose} />
          <ss.Content>
            <s.BlockMessage>No member selected.</s.BlockMessage>
          </ss.Content>
        </s.BlockMember>
      );
    }
    return (
      <s.BlockMember>
        <Header onModalClose={this.props.onModalClose} />
        <ss.Content>
          <s.BlockMessage>Blocked Members will not be able to view your Profile or contact you on Shaadi.com.</s.BlockMessage>
          <s.ReportMisuseCheck>
            <s.Checkbox type="checkbox" id="reportMisuse" selected={this.state.reportMisuse} onChange={this.toggleMisuse} />
            <s.DontShowLabel htmlFor="reportMisuse">Also, report this profile for Misuse.</s.DontShowLabel>
          </s.ReportMisuseCheck>

          <s.Footer>
            <s.BlockBtn onClick={this.onConfirm}>Confirm</s.BlockBtn>
            <s.BlockBtn isCancelBtn onClick={this.props.onModalClose}>
              Cancel
            </s.BlockBtn>
          </s.Footer>
        </ss.Content>
      </s.BlockMember>
    );
  }
}

const Header = props => (
  <ss.Header>
    <s.BlockMemberTitle>{props.title}</s.BlockMemberTitle>
    <ss.CloseModalBtn onClick={props.onModalClose} />
  </ss.Header>
);

Header.propTypes = {
  title: PropTypes.string,
  onModalClose: PropTypes.func.isRequired,
};

Header.defaultProps = {
  title: 'Are you sure you want to Block this Member?',
};

BlockMember.propTypes = {
  data: PropTypes.shape({
    uid: PropTypes.string,
    name: PropTypes.string,
    hasExceededMaxRequests: PropTypes.bool.isRequired,
    type: PropTypes.string,
  }).isRequired,
  onModalClose: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired,
};

export default BlockMember;
