import React from 'react';
import PropTypes from '../../../../PropTypes';
import s from './styles';

const showInfo = param => !!param;

const CtaInfo = props => {
  const { heShe, hisHer, himHer, reqInfo, connectionStatus } = props;
  const direction = reqInfo[props.listType].direction;
  switch (props.listType) {
    case 'connect_awaiting': {
      const { viewed_date } = reqInfo.connect_awaiting;
      if (['cancelled'].includes(connectionStatus)) {
        return <s.profileActionInfo isWarning>You Cancelled Your Invitaion</s.profileActionInfo>;
      }

      return (
        showInfo(viewed_date) &&
        !props.isHidden &&
        !['cancelled', 'declined'].includes(connectionStatus) && (
          <s.profileActionInfo>
            {heShe} viewed your Invitation on {viewed_date} and chose to respond later.
          </s.profileActionInfo>
        )
      );
    }
    case 'connect_deleted': {
      switch (connectionStatus) {
        case 'cancelled':
          return !props.isHidden && <s.profileActionInfo isWarning>You cancelled your Invitation</s.profileActionInfo>;
        case 'declined':
          return !props.isHidden && <s.profileActionInfo isWarning>You Declined {hisHer.toLowerCase()} Invitation</s.profileActionInfo>;
        default:
          return null;
      }
    }
    case 'request_accepted': {
      const { viewed_date, type } = reqInfo.request_accepted;
      const textMap = {
        out_contact: `${heShe} accepted your Phone Request on ${viewed_date}`,
        out_photo: `${heShe} accepted your Photo Request on ${viewed_date}`,
        in_contact: `You accepted ${hisHer.toLowerCase()} Phone Request on ${viewed_date}`,
        in_photo: `You accepted ${hisHer.toLowerCase()} Photo Request on ${viewed_date}`,
      };
      return showInfo(viewed_date) && <s.profileActionInfo>{textMap[`${direction}_${type}`]}</s.profileActionInfo>;
    }
    case 'request_awaiting': {
      const { actionTS, type } = reqInfo.request_awaiting;

      const textMap = {
        contact: `You requested ${himHer.toLowerCase()} to verify Phone No. on ${actionTS}`,
        photo: `You requested ${himHer.toLowerCase()} to add Photo on ${actionTS}`,
      };
      return showInfo(actionTS) && <s.profileActionInfo>{textMap[type]}</s.profileActionInfo>;
    }
    default:
      return null;
  }
};

CtaInfo.defaultProps = {
  listType: 'default',
  connectionStatus: '',
};
CtaInfo.propTypes = {
  isHidden: PropTypes.bool.isRequired,

  listType: PropTypes.string,
  heShe: PropTypes.string.isRequired,
  hisHer: PropTypes.string.isRequired,
  himHer: PropTypes.string.isRequired,
  connectionStatus: PropTypes.string,
  reqInfo: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default CtaInfo;
