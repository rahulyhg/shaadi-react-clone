import React from 'react';
import PropTypes from '../../../../PropTypes';
import s from '../styles';
import ss from './listStyles';

class SimilarProfile extends React.PureComponent {
  renderDefault = () => {
    const buttonBG =
      this.props.membershipTags === 'vip'
        ? this.props.isHovered
          ? 'url(/assets/prem/connect-vip-hover-small.svg) left top no-repeat'
          : 'url(/assets/prem/connect-vip-small.svg) left top no-repeat'
        : this.props.isHovered
          ? 'url(/assets/prem/connect-hover-small.svg) left top no-repeat'
          : 'url(/assets/prem/connect-small.svg) left top no-repeat';

    const buttonBGHover =
      this.props.membershipTags === 'vip'
        ? 'url(/assets/prem/connect-vip-hover-hover-small.svg) left top no-repeat'
        : 'url(/assets/prem/connect-hover-hover-small.svg) left top no-repeat';
    return (
      <s.InvitationBtnContainer
        isVisible
        customStyle={[
          {
            key: 'padding-left',
            value: '9px',
          },
          {
            key: 'height',
            value: '48px',
          },
        ]}
      >
        <s.LoadingWrapper
          customStyle={[
            {
              key: 'display',
              value: 'flex',
            },
            {
              key: 'background-color',
              value: 'rgba(241, 241, 242, 0.8)',
            },
            {
              key: 'width',
              value: '130px',
            },
            {
              key: 'border-radius',
              value: '50px',
            },
          ]}
        >
          <s.InvitationBtn
            isVisible
            onClick={this.props.onConnect}
            title="Connect"
            isHovered
            isPaidUser={this.props.isPaidUser}
            membershipTags={this.props.membershipTags}
            isConnect
            customStyle={[
              {
                key: 'width',
                value: '38px',
              },
              {
                key: 'height',
                value: '38px',
              },
              {
                key: 'margin',
                value: '0',
              },
              {
                key: 'background',
                value: buttonBG,
              },
              {
                key: 'border',
                value: 'none',
              },
            ]}
            customStyleHover={[
              {
                key: 'background',
                value: buttonBGHover,
              },
              {
                key: 'border',
                value: 'none',
              },
            ]}
          />
          <ss.InvitationBtnText
            onClick={this.props.onConnect}
            membershipTags={this.props.membershipTags}
            isSimilar
            customStyle={[
              {
                key: 'color',
                value: '#72727d',
              },
              {
                key: 'font-size',
                value: '12px',
              },
              {
                key: 'font-weight',
                value: this.props.isHovered ? 700 : 400,
              },
              {
                key: 'line-height',
                value: '15px',
              },
              {
                key: 'padding-left',
                value: '8px',
              },
            ]}
          >
            Connect Now
          </ss.InvitationBtnText>
        </s.LoadingWrapper>
      </s.InvitationBtnContainer>
    );
  };

  renderErrorMessage = (msg = 'Oops! Something went wrong') => {
    const ListHiddenTextStyle = [
      {
        key: 'margin',
        value: 0,
      },
      {
        key: 'text-align',
        value: 'center',
      },
      {
        key: 'font-style',
        value: 'italic',
      },
    ];
    return <ss.ListHiddenText customStyle={ListHiddenTextStyle}>{msg}</ss.ListHiddenText>;
  };

  render() {
    if (this.props.status === 'hidden') {
      return this.renderErrorMessage();
    }

    if (this.props.isHidden) {
      return this.renderErrorMessage(`Member has hidden ${this.props.hisHer.toLowerCase()} Profile`);
    }

    if (this.props.isDeleted) {
      return this.renderErrorMessage(`Member has deleted {this.props.hisHer.toLowerCase()} Profile`);
    }

    if (this.props.isSameGender) {
      return this.renderErrorMessage();
    }

    return this.renderDefault();
  }
}

SimilarProfile.defaultProps = {
  isPaidUser: false,
  isHovered: false,
  isDeleted: false,
  status: null,
};

SimilarProfile.propTypes = {
  hisHer: PropTypes.oneOf(['His', 'Her']).isRequired,
  onConnect: PropTypes.func.isRequired,
  membershipTags: PropTypes.string.isRequired,
  isHidden: PropTypes.bool.isRequired,
  isPaidUser: PropTypes.bool,
  isHovered: PropTypes.bool,
  isDeleted: PropTypes.bool,
  isSameGender: PropTypes.bool.isRequired,
  status: PropTypes.string,
};

export default SimilarProfile;
