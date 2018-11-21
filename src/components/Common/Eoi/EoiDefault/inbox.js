import React from 'react';
import PropTypes from '../../../../PropTypes';
import SvgLoader from '../../../Common/SvgLoader';
import s from './styles';
import ss from '../styles';
import EoiHidden from '../EoiHidden';
import FreeAccessBadge from '../../../FreeAccessBadge';

class Inbox extends React.PureComponent {
  render() {
    if (this.props.status === 'hidden') {
      switch (this.props.type) {
        case 'featured': {
          return (
            <s.FeaturedHiddenMsg vALign>
              Your Profile is currently hidden <br />
              <s.UnhideLinkFeatured isExternal to="/my-shaadi/profile/unhide/thank-you/y">
                Unhide Now
              </s.UnhideLinkFeatured>
            </s.FeaturedHiddenMsg>
          );
        }
        default: {
          return (
            <s.ListHiddenText vALign>
              Please{' '}
              <s.UnhideLink isExternal to="/my-shaadi/profile/unhide/thank-you/y">
                unhide
              </s.UnhideLink>{' '}
              your profile to Connect with this Member.
            </s.ListHiddenText>
          );
        }
      }
    }

    if (this.props.isHidden) {
      return (
        <EoiHidden
          type="inbox"
          hisHer={this.props.hisHer}
          hiddenReason={this.props.hiddenReason}
          onDelete={this.props.onDelete}
          isHorizontal={this.props.isHorizontal || this.props.status === 'declined'}
          listType={this.props.listType}
          membershipTags={this.props.membershipTags}
          isDeleted={this.props.isDeleted}
        />
      );
    }

    return ['sameGender', 'cancelled'].includes(this.props.status) ? (
      <ss.InboxStatusSuccess isVisible>
        <s.InvitationBtnContainer isVisible>
          <ss.EoiWrapper>
            <s.InfoHeading membershipTags={this.props.membershipTags} isVisible>
              Changed Your Mind?
            </s.InfoHeading>
            <s.ConnectBtn
              isVisible
              onClick={this.props.onConnect}
              title="Connect"
              isHovered={this.props.isHovered}
              isPaidUser={this.props.isPaidUser}
              membershipTags={this.props.membershipTags}
            />
            <s.InvitationBtnText onClick={this.props.onConnect} isHovered={this.props.isHovered} membershipTags={this.props.membershipTags}>
              Connect
            </s.InvitationBtnText>

            <SvgLoader isVisible={this.props.isPartialLoading} />
          </ss.EoiWrapper>
          <FreeAccessBadge
            isPaidUser={this.props.isPaidUser}
            canCommunicate={this.props.canCommunicate}
            himHer={this.props.hisHer}
            toolTipPlacement="bottomRight"
          />
        </s.InvitationBtnContainer>
      </ss.InboxStatusSuccess>
    ) : null;
  }
}

Inbox.defaultProps = {
  canSendPasswordOnConnect: true,
  isPaidUser: false,
  isHovered: false,
  listType: '',
  isHorizontal: false,
  isDeleted: false,
  type: 'inbox',
  canCommunicate: false,
};

Inbox.propTypes = {
  status: PropTypes.oneOf(['cancelled', 'sameGender']).isRequired,
  isPartialLoading: PropTypes.bool.isRequired,
  onConnect: PropTypes.func.isRequired,
  membershipTags: PropTypes.string.isRequired,
  isPaidUser: PropTypes.bool,
  isHovered: PropTypes.bool,
  listType: PropTypes.string,
  hisHer: PropTypes.string.isRequired,
  isHidden: PropTypes.string.isRequired,
  hiddenReason: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  isHorizontal: PropTypes.bool,
  isDeleted: PropTypes.bool,
  type: PropTypes.string,
  canCommunicate: PropTypes.bool,
};

export default Inbox;
