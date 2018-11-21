import React from 'react';
import PropTypes from '../../../../PropTypes';
import SvgCheckmark from '../../../Common/SvgCheckmark';
import Tooltip from '../../../Common/Tooltip';
import s from './styles';
import ss from '../styles';
import EoiHidden from '../EoiHidden';

const renderAction = isEnabled => (tooltip = {}, params = {}) =>
  !isEnabled ? (
    <Tooltip
      trigger={tooltip.trigger}
      placement={tooltip.placement}
      overlayClassName={tooltip.overlayClass}
      offset={tooltip.offset}
            overlay={tooltip.overlay} //eslint-disable-line
    >
      <s.btnWrap>
        {params.type === 'remind' && (
          <s.btnChildWrap>
            <s.RemindBtn isHovered={params.isHovered} membershipTags={params.membershipTags} title="Remind" isDisabled />

            <s.RemindBtnBtnText isHovered={params.isHovered} membershipTags={params.membershipTags} isDisabled>
              Remind
            </s.RemindBtnBtnText>
          </s.btnChildWrap>
        )}
        {params.type === 'cancel' && (
          <s.btnChildWrap>
            <s.SkipBtn isHovered={params.isHovered} membershipTags={params.membershipTags} title="Cancel" isDisabled />

            <s.SkipBtnText isHovered={params.isHovered} membershipTags={params.membershipTags} isDisabled>
              Cancel
            </s.SkipBtnText>
          </s.btnChildWrap>
        )}
      </s.btnWrap>
    </Tooltip>
  ) : (
    <div>
      {params.type === 'remind' && (
        <div>
          <s.RemindBtn isHovered={params.isHovered} membershipTags={params.membershipTags} title="Remind" onClick={params.onRemind} />

          <s.RemindBtnBtnText onClick={params.onRemind} isHovered={params.isHovered} membershipTags={params.membershipTags}>
            Remind
          </s.RemindBtnBtnText>
        </div>
      )}
      {params.type === 'cancel' && (
        <div>
          <s.SkipBtn isHovered={params.isHovered} onClick={params.onCancelInvite} membershipTags={params.membershipTags} title="Cancel" />

          <s.SkipBtnText isHovered={params.isHovered} onClick={params.onCancelInvite} membershipTags={params.membershipTags}>
            Cancel
          </s.SkipBtnText>
        </div>
      )}
    </div>
  );
const Inbox = props => {
  if (props.isHidden) {
    return (
      <EoiHidden
        type="inbox"
        hisHer={props.hisHer}
        hiddenReason={props.hiddenReason}
        onDelete={() => {}}
        isHorizontal={props.isHorizontal || props.status === 'declined' || props.listType === 'connect_deleted'}
        listType={props.listType}
        membershipTags={props.membershipTags}
        isDeleted={props.isDeleted}
      />
    );
  }
  const tooltipReminder = {
    trigger: 'hover',
    placement: 'left',
    overlayClass: 'rc-tooltip-dark-invite rc-tooltip-placement-left',
    offset: [0, -5],
    className: 'button',
    overlay: (
      <span>
        Visit again after 24 hours to send a <br />Reminder.
      </span>
    ),
  };
  const tooltipCancel = {
    ...tooltipReminder,
    overlay: (
      <span>
        You can Cancel an invitation after<br />7 days of sending it.
      </span>
    ),
  };
  const reminderCompParam = {
    onRemind: props.onRemind,
    isHovered: props.isHovered,
    membershipTags: props.membershipTags,
    type: 'remind',
  };
  const cancelCompParam = {
    onCancelInvite: props.onCancelInvite,
    isHovered: props.isHovered,
    membershipTags: props.membershipTags,
    type: 'cancel',
  };

  return (
    <ss.InboxStatusSuccess isVisible>
      {props.status !== 'filteredContacted' && (
        <ss.PremSuccessMsg>
          <ss.InboxStatusText isItalicText>
            {props.justNow && (
              <div>
                <SvgCheckmark isListingSvg />
                <ss.MsgSpacer />
              </div>
            )}
            {props.justNow ? (
              <div>
                Reminder sent.<br />
                {!props.isPaidUser && (
                  <ss.UpgradeTextLink
                    isExternal
                    to={`/payment?loc=list&profileid=${props.profileId}&source=search_listing`}
                    target="_blank"
                  >
                    Upgrade
                  </ss.UpgradeTextLink>
                )}
                Contact {props.himHer.toLowerCase()} directly
              </div>
            ) : (
              <div>Waiting for a response?</div>
            )}
          </ss.InboxStatusText>
        </ss.PremSuccessMsg>
      )}
      {props.status === 'filteredContacted' ? (
        <s.note>
          Invitation Sent.<br /> We will notify you when {props.heShe.toLowerCase()} responds.
        </s.note>
      ) : (
        renderAction(props.canRemind)(tooltipReminder, reminderCompParam)
      )}
      {renderAction(props.canCancelInvite)(tooltipCancel, cancelCompParam)}
    </ss.InboxStatusSuccess>
  );
};

Inbox.defaultProps = {
  isHidden: false,
  hiddenReason: null,
  isHorizontal: false,
  isDeleted: false,
};

Inbox.propTypes = {
  himHer: PropTypes.oneOf(['Him', 'Her']).isRequired,
  heShe: PropTypes.oneOf(['He', 'She']).isRequired,
  hisHer: PropTypes.oneOf(['His', 'Her']).isRequired,
  isPaidUser: PropTypes.bool.isRequired,
  justNow: PropTypes.bool.isRequired,
  isHovered: PropTypes.bool.isRequired,
  membershipTags: PropTypes.string.isRequired,
  canRemind: PropTypes.bool.isRequired,
  onRemind: PropTypes.func.isRequired,
  canCancelInvite: PropTypes.bool.isRequired,
  onCancelInvite: PropTypes.func.isRequired,
  profileId: PropTypes.string.isRequired,
  isHidden: PropTypes.bool,
  hiddenReason: PropTypes.string,
  isHorizontal: PropTypes.bool,
  status: PropTypes.string.isRequired,
  listType: PropTypes.string.isRequired,
  isDeleted: PropTypes.bool,
};

export default Inbox;
