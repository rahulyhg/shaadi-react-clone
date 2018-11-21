import React from 'react';
import PropTypes from '../../../PropTypes';
import s from './styles';
import Tooltip from '../Tooltip';
import { encode64 } from '../../../actions/doPreferredSearch/utils';

const evt_ref = encode64('contact-summary');
const misues_ref = encode64('misuse');
const block_ref = encode64('block');

const Icon = props => <s.icon {...props}>{props.linkText}</s.icon>;
Icon.propTypes = {
  linkText: PropTypes.string,
};

Icon.defaultProps = {
  linkText: '',
};

class ReportBlockContact extends React.PureComponent {
  render() {
    const { himHer, slug } = this.props;
    return (
      <s.reportBlockContact isHovered={this.props.isHovered}>
        <s.smallIconTextWrapper>
          <Icon
            isDisplay={this.props.isBlockDisplay}
            to={`${this.props.wwwBaseUrl}/profile?evt_ref=${evt_ref}&atact=${block_ref}&profileid=${slug}`}
            target={'_blank'}
            title="This Member will not be able to see or contact you on Shaadi.com"
            linkText={`Block ${himHer}`}
            iconName="Block"
          />
          <Icon
            isDisplay={this.props.isMisuseDisplay}
            to={`${this.props.wwwBaseUrl}/profile?evt_ref=${evt_ref}&atact=${misues_ref}&profileid=${slug}`}
            target={'_blank'}
            linkText="Report Misuse"
            iconName="Misuse"
          />

          {this.props.isHelpDisplay &&
            this.props.isHovered && (
              <Tooltip
                isQuestionMark
                offset={[0, -5]}
                trigger="hover"
                overlayClassName="rc-tooltip-dark-invite"
                overlay={<span>Help us build a safer community by reporting inappropriate behaviour or misleading information.</span>}
              />
            )}
        </s.smallIconTextWrapper>
      </s.reportBlockContact>
    );
  }
}
ReportBlockContact.defaultProps = {
  isHovered: false,
  isBlockDisplay: false,
  isMisuseDisplay: false,
  isHelpDisplay: false,
};
ReportBlockContact.propTypes = {
  isHovered: PropTypes.bool.isRequired,
  isBlockDisplay: PropTypes.bool.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  isMisuseDisplay: PropTypes.bool.isRequired,
  isHelpDisplay: PropTypes.bool.isRequired,
  himHer: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default ReportBlockContact;
