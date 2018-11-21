import React from 'react';
import PropTypes from '../../../PropTypes';
import s from './styles';
import Tooltip from '../Tooltip';

const ProfileContactNote = props => {
  const { connectionNote = '' } = props.profile.flags;
  const { isSameGender, connectionStatus, connectionAction } = props.profile.flags;
  const { shortlists, himHer, hisHer, heShe } = props.profile;
  const messageStatusMap = {
    blocked: 'This Member cannot view your Profile or contact you on Shaadi.com.',
    declined: 'This Member will not be able to contact you on Shaadi.com.',
    theyDeclined: `You cannot contact this Member on Shaadi.com. We will notify you if ${heShe.toLowerCase()} changes ${hisHer.toLowerCase()} mind.`,
    cancelled: 'This Member will not be able to contact you on Shaadi.com.',
    theyCancelled: `You cannot contact this Member on Shaadi.com. We will notify you if ${heShe.toLowerCase()} changes ${hisHer.toLowerCase()} mind.`,
    filteredContacted: `You do not match ${hisHer.toLowerCase()} partner requirements.`,
    member_filtered: `You do not match ${hisHer.toLowerCase()} partner requirements.`,
    member_filtered_contacted: `You do not match ${hisHer.toLowerCase()} partner requirements.`,
    profile_filtered: `${heShe} has sent you an invitation.`,
    profile_filtered_contacted: `${heShe} has sent you an invitation.`,
    default: '',
  };

  const allowedConnectionStatusMap = {
    shortlisted: ['default', 'shortlisted'],
    member_filtered_not_contacted: ['default'],
    member_filtered_contacted: ['contacted', 'filteredContacted'],
    profile_filtered_contacted: ['theyContacted'],
  };

  if (isSameGender) {
    return (
      <s.ProfileContactNoteText>
        You cannot contact other members of the {<s.SameGenderHighlight>same gender.</s.SameGenderHighlight>}
      </s.ProfileContactNoteText>
    );
  }

  if (allowedConnectionStatusMap.shortlisted.includes(connectionStatus) && shortlists.count > 0) {
    return (
      <s.ProfileContactNoteText>
        {heShe} has been added to your{' '}
        {
          <s.ShortlistHighlight isExternal target={'_blank'} to={`/profile/shortlist`}>
            Shortlisted Members.
          </s.ShortlistHighlight>
        }
      </s.ProfileContactNoteText>
    );
  }

  if (
    allowedConnectionStatusMap.member_filtered_contacted.includes(connectionStatus) &&
    ['member_filtered', 'member_filtered_contacted'].includes(connectionAction)
  ) {
    return [
      connectionNote || messageStatusMap[connectionAction],
      <Tooltip
        isVisible
        isQuestionMark
        placement="bottom"
        offset={[0, -5]}
        tooltip={{
          body: [
              { key: 'para-1', items: [{ type: 'text', key: 'sentence-1', text: `We have notified ${himHer.toLowerCase()} of your Interest, but ${heShe.toLowerCase()} may not respond.` }] }, //eslint-disable-line
          ],
        }}
      />,
    ];
  }

  if (
    allowedConnectionStatusMap.member_filtered_not_contacted.includes(connectionStatus) &&
    ['member_filtered'].includes(connectionAction)
  ) {
    return [
      connectionNote || messageStatusMap[connectionAction],
      <Tooltip
        isVisible
        isQuestionMark
        placement="bottom"
        offset={[0, -5]}
        tooltip={{
          body: [
            {
              key: 'beh',
              items: [
                {
                  type: 'text',
                  key: 'bleh',
                  text: `You may still choose to send ${himHer.toLowerCase()} an Interest, but ${heShe.toLowerCase()} may not respond.`,
                },
              ],
            },
          ],
        }}
      />,
    ];
  }

  if (
    allowedConnectionStatusMap.profile_filtered_contacted.includes(connectionStatus) &&
    ['profile_filtered', 'profile_filtered_contacted'].includes(connectionAction)
  ) {
    return [
      connectionNote || messageStatusMap[connectionAction],
      <Tooltip
        trigger="hover"
        isQuestionMark
        placement="bottom"
        offset={[0, -5]}
        tooltip={{
          title: '',
          body: [
            { key: 'beh', items: [{ type: 'text', key: 'bleh', text: 'You can change this criteria by visiting your' }] },
            {
              key: 'beh1',
              items: [
                {
                  type: 'link',
                  key: 'bleh',
                  text: 'Contact Filters',
                  url: '/my-shaadi/partner-profile/contact-filter',
                  text2: 'page',
                },
              ],
            },
          ],
        }}
      />,
    ];
  }

  switch (connectionStatus) {
    case 'blocked':
    case 'declined':
    case 'theyDeclined':
    case 'cancelled':
    case 'theyCancelled':
      return <s.ProfileContactNoteText>{connectionNote || messageStatusMap[connectionStatus]}</s.ProfileContactNoteText>;
    default:
      return connectionNote && <s.ProfileContactNoteText>{connectionNote}</s.ProfileContactNoteText>;
  }
};

ProfileContactNote.defaultProps = {
  profile: {
    flags: {
      connectionStatus: 'default',
      isSameGender: false,
      connectionNote: null,
    },
  },
};

ProfileContactNote.propTypes = {
  profile: PropTypes.shape({
    heShe: PropTypes.oneOf(['He', 'She', '...']).isRequired,
    hisHer: PropTypes.oneOf(['His', 'Her', '...']).isRequired,
    flags: PropTypes.shape({
      connectionStatus: PropTypes.string,
      connectionNote: PropTypes.string,
      isSameGender: PropTypes.bool,
    }).isRequired,
  }).isRequired,
};

export default ProfileContactNote;
