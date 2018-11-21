import React from 'react';
import PropTypes from '../../../../PropTypes';
import s from '../styles';
import Tooltip from '../../../Common/Tooltip';

const Profile = props =>
  props.status === 'filteredContacted' ? (
    <div>
      <s.InvitationHeading isVisible>
        {`Invitation Sent. We will notify you when ${props.heShe.toLowerCase()} responds.`}
      </s.InvitationHeading>
      <s.InvitationBtn isVisible isLargeBtn isCancelBtn onClick={props.onCancelInvite}>
        Cancel
      </s.InvitationBtn>
      <s.Note>
        {props.note || 'You have sent an Invitation to this member.'}
        <Tooltip
          isVisible
          isQuestionMark
          placement="bottom"
          offset={[0, -5]}
          tooltip={{
            body: [
              { key: 'para-1', items: [{ type: 'text', key: 'sentence-1', text: `We have notified ${props.himHer.toLowerCase()} of your Interest, but ${props.heShe.toLowerCase()} may not respond.` }] }, //eslint-disable-line
            ],
          }}
        />
      </s.Note>
    </div>
  ) : (
    <div>
      <s.InvitationHeading isVisible>Waiting for a response? Send {props.himHer.toLowerCase()} a Reminder...</s.InvitationHeading>
      <div>
        {!props.canRemind ? (
          <Tooltip
            trigger="hover"
            placement="bottomLeft"
            overlayClassName="rc-tooltip-dark-invite"
            offset={[0, -5]}
            overlay={<span>Visit again after 24 hours to send a <br />Reminder.</span>} //eslint-disable-line
          >
            <s.InvitationBtnWithTooltip className="button" isVisible isLargeBtn isCancelBtn disabled>
              Send Reminder
            </s.InvitationBtnWithTooltip>
          </Tooltip>
        ) : (
          <s.InvitationBtn className="button" isVisible isLargeBtn onClick={props.onRemind}>
            Send Reminder
          </s.InvitationBtn>
        )}
        {!props.canCancelInvite ? (
          <Tooltip
            trigger="hover"
            placement="bottomRight"
            overlayClassName="rc-tooltip-dark-invite"
            offset={[0, -5]}
            overlay={<span>You can Cancel an invitation after<br />7 days of sending it.</span>} //eslint-disable-line
          >
            <s.InvitationBtnWithTooltip className="button" isVisible isLargeBtn isCancelBtn disabled>
              Cancel
            </s.InvitationBtnWithTooltip>
          </Tooltip>
        ) : (
          <s.InvitationBtn className="button" isVisible isLargeBtn isCancelBtn onClick={props.onCancelInvite}>
            Cancel
          </s.InvitationBtn>
        )}
        {props.request.details &&
          props.request.details.count > 0 && (
            <s.RequestCountLink onClick={props.onViewRequest}>
              Requests
              <s.RequestCount>{props.request.details.count}</s.RequestCount>
            </s.RequestCountLink>
          )}
        {props.request.details &&
          props.request.details.count > 0 &&
          !props.isLoggerBothPartyPayUser &&
          props.showHistory && <s.separator>|</s.separator>}
        {!props.isLoggerBothPartyPayUser &&
          props.showHistory && (
            <s.ViewHistoryButton className="button" onClick={props.onViewHistory}>
              View History
            </s.ViewHistoryButton>
          )}
      </div>
      <s.Note>{props.note || 'You have sent an Invitation to this member.'}</s.Note>
    </div>
  );

Profile.defaultProps = {
  note: null,
  canRemind: false,
  canCancelInvite: false,
  showHistory: false,
  isLoggerBothPartyPayUser: false,
  request: {
    details: {
      count: 0,
      request_type: [],
    },
  },
};

Profile.propTypes = {
  heShe: PropTypes.oneOf(['He', 'She']).isRequired,
  himHer: PropTypes.oneOf(['Him', 'Her']).isRequired,
  status: PropTypes.connectionStatus.isRequired,
  note: PropTypes.string,
  canRemind: PropTypes.bool.isRequired,
  canCancelInvite: PropTypes.bool.isRequired,
  onRemind: PropTypes.func.isRequired,
  // onCancelRemind: PropTypes.func.isRequired,
  onCancelInvite: PropTypes.func.isRequired,
  onViewHistory: PropTypes.func.isRequired,
  onViewRequest: PropTypes.func.isRequired,
  showHistory: PropTypes.bool,
  request: PropTypes.shape({
    details: PropTypes.shape({
      count: PropTypes.number,
      request_type: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
  }).isRequired,
  isLoggerBothPartyPayUser: PropTypes.bool,
};

export default Profile;
