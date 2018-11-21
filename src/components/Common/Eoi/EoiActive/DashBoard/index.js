import React from 'react';
import PropTypes from 'prop-types';
import '../../styles.css';

import SvgCheckmark from '../../../../Common/SvgCheckmark';
import Timer from '../../../../../helpers/timer';
import s from '../../styles';
import Cta from '../../../../Common/Button/Cta';
import './styles.css';
import EoiMessage from '../../EoiMessage';
import { getCtaColor } from '../../utils';

const DashBoard = props => {
  const versionType = getCtaColor(props.isPaidUser, props.membershipTags);
  switch (props.status) {
    case 'declined':
    case 'theyDeclined':
    case 'theyCancelled':
      return <EoiMessage status={props.status} type={props.type} />;
    case 'accepted':
      return (
        <Timer
          loader={
            props.justNow && (
              <s.TickContainer>
                <SvgCheckmark isPremiumCarousel isListingSvg />
              </s.TickContainer>
            )
          }
          response={
            <div style={{ display: 'flex' }}>
              <Cta actionType="sendMessage" versionType={versionType} onClick={props.onChatNow}>
                <button className="Cta_Btn">Write Message</button>
              </Cta>

              <Cta actionType="viewContact" versionType={versionType} onClick={props.onShowContactDetails}>
                <button className="Cta_Btn">View Contact</button>
              </Cta>
            </div>
          }
          time={1}
        />
      );
    case 'theyAccepted':
      return (
        <div style={{ display: 'flex' }}>
          <Cta actionType="sendMessage" versionType="green" onClick={props.onChatNow}>
            <button className="Cta_Btn">Write Message</button>
          </Cta>

          <Cta actionType="viewContact" versionType="green" onClick={props.onShowContactDetails}>
            <button className="Cta_Btn">View Contact</button>
          </Cta>
        </div>
      );
    default:
      return props.status;
  }
};

DashBoard.defaultProps = {
  onChatNow: () => {},
  onShowContactDetails: () => {},
  justNow: false,
};
DashBoard.propTypes = {
  status: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChatNow: PropTypes.func,
  onShowContactDetails: PropTypes.func,
  justNow: PropTypes.bool,
  isPaidUser: PropTypes.bool.isRequired,
  membershipTags: PropTypes.string.isRequired,
};
export default DashBoard;
