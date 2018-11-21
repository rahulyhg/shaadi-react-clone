import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import ProfilePhotoMobile from '../../mComponents/Common/ProfilePhotoMobile';
import Message from '../../mComponents/Common/Message';
import { Badge } from '../ProfileCard';
import { CardContainer, CardHeader, MemberShipTag, ProfilePic, ProfileName, Time, UserInfo, UserMsg, DetailSection } from './styles';
import EoiMobile from '../../mComponents/EoiMobile';
import { getMsgType, getInfoMsgContent } from './utils';

const onUserAction = (onAction, ...newArgs) => (type, ...args) => {
  const updateArg = type === 'delete_mobile' ? [...args, ...newArgs] : args;
  onAction(type, ...updateArg);
};

export class Card extends React.PureComponent {
  componentWillReceiveProps(props) {
    if (this.props.item.eoiReqType !== props.item.eoiReqType) {
      this.props.updateActionTaken();
    }
  }
  onTap = () => {
    this.profileUrl && this.props.history.push(this.profileUrl);
  };

  profileUrl = this.props.getProfileUrl(this.props.item);
  render() {
    const { item, profile, onAction, isBothPartyPayUser, isPaidUser, memberHidden, gaEventActionLabel } = this.props;
    const { listType } = item;
    const [type, action] = listType.split('_');
    const { actionDate, message = '', isNew, type: reqType, requestDirection } = item.requests[listType];
    const { isIndianDiaspora, isHidden, isDeleted } = profile.flags;
    let { connectionStatus } = profile.flags;

    if (type === 'request') {
      connectionStatus = listType === 'request_pending' ? `add_${item.requests[`${type}_${action}`].type}` : '';
    }
    if (isHidden) {
      connectionStatus = isDeleted || ['connect_deleted', 'connect_awaiting'].includes(listType) ? 'none' : 'theyHidden';
    }
    const msgType = getMsgType({ listType, ...item.requests[listType], isBothPartyPayUser });
    const ShowInfo = getInfoMsgContent(this.props);
    return (
      <CardContainer isNew={isNew} hide={!!item.eoiReqType} onClick={item.justNow ? () => {} : this.onTap}>
        <CardHeader>
          <MemberShipTag>
            <Badge tag={profile.flags.membershipTags} plan={profile.flags.membershipLevel} position="top" />
          </MemberShipTag>
          <ProfilePic>
            <ProfilePhotoMobile
              uid={item.uid}
              gender={profile.gender}
              photo={profile.photoMedium}
              photoCount={profile.summary.listAlbum.length}
              photosLoading={profile.summary.photosLoading}
              albumStatus={profile.flags.albumStatus}
              source={'inbox'}
              onAction={onAction}
            />
          </ProfilePic>
          <Time>{actionDate}</Time>
        </CardHeader>
        <ProfileName>{profile.name}</ProfileName>
        <DetailSection>
          <UserInfo style={msgType === 'none' && !ShowInfo && { paddingBottom: '12px' }}>
            {profile.summary[isIndianDiaspora ? 'infoIndian' : 'infoIndianNri'].map(detail => <div key={detail.key}>{detail.value}</div>)}
          </UserInfo>

          {!!(msgType !== 'none' || ShowInfo) && (
            <UserMsg>
              <Message
                style={{ paddingBottom: '12px' }}
                MsgDisplay={msgType}
                senderName={profile.name}
                msgContent={message}
                profileUrl={this.profileUrl}
              />
              {!!ShowInfo && (
                <Message
                  style={{ paddingBottom: '12px' }}
                  MsgDisplay={ShowInfo.InfoType}
                  senderName={profile.name}
                  msgContent={ShowInfo.alertMsg}
                  profileUrl={this.profileUrl}
                />
              )}
            </UserMsg>
          )}

          <EoiMobile
            uid={item.uid}
            gender={profile.gender}
            isPaidUser={isPaidUser}
            membershipLevel={profile.flags.membershipLevel}
            membershipTags={profile.flags.membershipTags}
            connectionStatus={connectionStatus}
            justNowClass={item.justNowClass}
            justNow={item.justNow}
            justNowText={item.justNowClass === 'just_now_error' ? item.justNowText : ''}
            onAction={onUserAction(this.props.onAction, requestDirection, reqType)}
            canSendRemind={profile.flags.canRemind}
            canCancelInvite={profile.flags.canCancelInvite}
            isHidden={isHidden}
            memberHidden={memberHidden}
            source="inbox"
            actionSource="inbox"
            gaEventActionLabel={gaEventActionLabel}
          />
        </DetailSection>
      </CardContainer>
    );
  }
}
Card.defaultProps = {
  updateActionTaken: () => {},
};

Card.propTypes = {
  item: PropTypes.shape(PropTypes.searchItem).isRequired,
  profile: PropTypes.shape(PropTypes.searchProfile).isRequired,
  onAction: PropTypes.func.isRequired,
  getProfileUrl: PropTypes.func.isRequired,
  isBothPartyPayUser: PropTypes.bool.isRequired,
  isPaidUser: PropTypes.bool.isRequired,
  history: PropTypes.shape(PropTypes.history).isRequired,
  updateActionTaken: PropTypes.func,
  memberHidden: PropTypes.bool.isRequired,
  gaEventActionLabel: PropTypes.string.isRequired,
};

export default withRouter(Card);
