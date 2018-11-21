import React from 'react';
import PropTypes from 'prop-types';

import s from './styles';

const navInfo = {
  connect_pending: {
    url: '/search/partner',
    navText: 'View My Matches',
  },
};

const renderMsg = (sourceType, count) => {
  switch (sourceType) {
    case 'connect_pending':
      return (
        <s.Statement>
          There are no Pending Invitations to Connect<br />
          <s.NoResultLink isExternal to="/search/partner">
            View My Matches<s.LinkArrow />
          </s.NoResultLink>
        </s.Statement>
      );
    case 'connect_accepted': {
      if (count.connect_pending || count.connect_pending_new) {
        navInfo.connect_pending.url = '/inbox/pending/interests';
        navInfo.connect_pending.navText = ' View Pending Invitations';
      }
      return (
        <s.Statement>
          There are no Accepted Members<br />
          <s.NoResultLink isExternal to={navInfo.connect_pending.url}>
            {navInfo.connect_pending.navText}
            <s.LinkArrow />
          </s.NoResultLink>
        </s.Statement>
      );
    }
    case 'connect_filtered':
      return (
        <s.Statement>
          There are no Filtered Out Invitations<br />
          <s.NoResultLink isExternal to="/search/partner">
            View My Matches<s.LinkArrow />
          </s.NoResultLink>
        </s.Statement>
      );
    case 'connect_awaiting':
      return (
        <s.Statement>
          There are no Sent Invitations<br />
          <s.NoResultLink isExternal to="/search/partner">
            View My Matches<s.LinkArrow />
          </s.NoResultLink>
        </s.Statement>
      );
    case 'connect_deleted':
      return <s.Statement>There are no Deleted Invitations</s.Statement>;
    case 'request_pending':
      return <s.Statement>There are no Pending Requests</s.Statement>;
    case 'request_accepted':
      return <s.Statement>There are no Accepted Requests</s.Statement>;
    case 'request_awaiting':
      return <s.Statement>There are no Sent Requests</s.Statement>;
    default:
      return null;
  }
};

const Inbox = props => {
  const { sourceType, count } = props;
  const listType = sourceType !== 'none' && sourceType.split('_')[0];
  return (
    <div>
      <s.MatchItemWrap listType={listType}>
        <s.CupidImg listType={listType} />
        {renderMsg(sourceType, count)}
      </s.MatchItemWrap>
    </div>
  );
};

Inbox.defaultProps = {
  sourceType: 'none',
};
Inbox.propTypes = {
  sourceType: PropTypes.string.isRequired,
  count: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default Inbox;
