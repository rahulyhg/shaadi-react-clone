import React from 'react';
import PropTypes from '../../../../PropTypes';
import s from './styles';
import { GA } from '../../../../actions/lib/utils';
import EoiHidden from '../EoiHidden';
import reqConfig from './reqConfig';

class EoiRequest extends React.PureComponent {
  static renderMemberHidden() {
    return (
      <s.RequestWrap>
        <s.MemberHiddenWrap>
          Please{' '}
          <s.UnhideLink isExternal to="/my-shaadi/profile/unhide/thank-you/y">
            unhide
          </s.UnhideLink>{' '}
          your profile to Connect with this Member.
        </s.MemberHiddenWrap>
      </s.RequestWrap>
    );
  }
  constructor(props) {
    super(props);
    this.delete = this.action('delete').bind(this);
  }
  action(...args) {
    return () => {
      GA.trackEoiEvent(...args, this.props.type);
      this.props.onAction(this.props.profile.uid, ...args);
    };
  }

  render() {
    const { type, profile, isMemberHidden, isHovered, listType, reqType } = this.props;
    const { isHidden, hiddenReason } = profile.flags;
    const { hisHer, membershipTags, isDeleted } = profile;
    switch (type) {
      case 'inbox': {
        if (isMemberHidden) return EoiRequest.renderMemberHidden();
        if (isHidden)
          return (
            <s.RequestWrap>
              <EoiHidden
                type="inbox"
                hisHer={hisHer}
                hiddenReason={hiddenReason}
                onDelete={this.delete}
                membershipTags={membershipTags}
                isDeleted={isDeleted}
              />
            </s.RequestWrap>
          );
        if (listType !== 'request_pending') return null;
        return (
          <s.RequestWrap>
            <s.RequestInnerWrap>
              <s.ReqBtn
                to={reqConfig.inboxReqMap[`${reqType}`].NavUrl}
                isExternal
                isHovered={isHovered}
                membershipTags={membershipTags}
                imgConfig={reqConfig.inboxReqMap[`${reqType}`]}
                title={reqConfig.inboxReqMap[`${reqType}`].Title}
              />
              <s.BtnText isHovered={isHovered} to={reqConfig.inboxReqMap[`${reqType}`].NavUrl} isExternal>
                {reqConfig.inboxReqMap[`${reqType}`].Title}
              </s.BtnText>
            </s.RequestInnerWrap>
          </s.RequestWrap>
        );
      }
      default:
        return null;
    }
  }
}
EoiRequest.defaultProps = {
  isHovered: false,
};
EoiRequest.propTypes = {
  type: PropTypes.oneOf(['inbox']).isRequired,
  isMemberHidden: PropTypes.bool.isRequired,
  reqType: PropTypes.oneOf(['photo', 'contact']).isRequired,
  listType: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
  isHovered: PropTypes.bool,
  profile: PropTypes.shape({
    uid: PropTypes.string,
    himHer: PropTypes.oneOf(['Him', 'Her', '...']).isRequired,
    hisHer: PropTypes.oneOf(['His', 'Her', '...']).isRequired,
    heShe: PropTypes.oneOf(['He', 'She', '...']).isRequired,
    name: PropTypes.string.isRequired,
    userHandle: PropTypes.string,
    flags: PropTypes.shape({
      isDeleted: PropTypes.bool.isRequired,
      isHidden: PropTypes.bool,
      isFree: PropTypes.bool,
      membershipTags: PropTypes.string,
      hiddenReason: PropTypes.oneOf(['selfHidden', 'systemHidden', 'selfDeleted', 'systemDeleted', 'defaultDeleted']),
    }),
  }).isRequired,
};

export default EoiRequest;
