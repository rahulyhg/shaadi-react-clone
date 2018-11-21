import React from 'react';
import PropTypes from 'prop-types';
import { hideContactData, trim } from './utils';
import { Icon, Anchor } from './styles';

const UserMsg = props => {
  const { msgContent } = props;
  const showMsg = trim(/\s/g, msgContent, 65);
  return (
    <div>
      <Icon type="default" />
      &quot;{hideContactData(/#/g, showMsg.substr(0, 65), ['Phone No Visible on Accept', 'Email Visible on Accept'])}
      {showMsg.length > 65 && `...`}&quot;&nbsp;
      <Anchor type="upgradeLink" isExternal to={props.profileUrl}>
        View Profile
      </Anchor>
    </div>
  );
};
UserMsg.defaultProps = {
  msgContent: null,
  profileUrl: '',
};
UserMsg.propTypes = {
  msgContent: PropTypes.string,
  profileUrl: PropTypes.string, // eslint-disable-line react/forbid-prop-types
};
export default UserMsg;
