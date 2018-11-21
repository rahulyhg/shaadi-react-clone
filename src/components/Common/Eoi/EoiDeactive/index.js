import React from 'react';
import PropTypes from '../../../../PropTypes';
import { showDeleteBtn } from '../utils';
import s from './styles';
import EoiMessage from '../EoiMessage';

const EoiDeactive = props => {
  const { hisHer } = props;
  const msgTextMap = {
    selfDeleted: `Member has deleted ${hisHer.toLowerCase()} Profile`,
    systemDeleted: 'The profile has been deleted.',
    defaultDeleted: `Member has decided to keep ${hisHer.toLowerCase()} profile hidden. Please check again after a few days`,
    default: 'Oops! Something went wrong',
  };
  switch (props.type) {
    case 'similarProfile':
      return (
        <s.DeactiveBtnContainer isVisible isHorizontal={props.isHorizontal}>
          <s.InfoHeading isHorizontal={props.isHorizontal} isVisible isSimilar>
            {msgTextMap[props.hiddenReason] || msgTextMap.default}
          </s.InfoHeading>
        </s.DeactiveBtnContainer>
      );
    case 'inbox':
      return (
        <s.DeactiveBtnContainer isVisible isHorizontal={props.isHorizontal}>
          <s.InfoHeading isHorizontal={props.isHorizontal} isVisible>
            {msgTextMap[props.hiddenReason]}
          </s.InfoHeading>
          {showDeleteBtn(props) && (
            <div>
              <s.InboxDeclineBtn onClick={props.onDelete} membershipTags={props.membershipTags} title="Delete" />
              <s.InboxDeclineBtnText onClick={props.onDelete}>Delete</s.InboxDeclineBtnText>
            </div>
          )}
        </s.DeactiveBtnContainer>
      );
    case 'dashboard': {
      return <EoiMessage hisHer={props.hisHer} type={props.type} status={props.status} hiddenReason={props.hiddenReason} />;
    }
    default:
      return null;
  }
};

EoiDeactive.defaultProps = {
  isHorizontal: false,
  listType: '',
  hiddenReason: 'default',
  status: 'disabled',
};
EoiDeactive.propTypes = {
  type: PropTypes.oneOf(['inbox', 'profile', 'list', 'grid', 'similarProfile']).isRequired,
  hisHer: PropTypes.string.isRequired,
  hiddenReason: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  isHorizontal: PropTypes.bool,
  membershipTags: PropTypes.membershipTags.isRequired,
  status: PropTypes.string,
};
export default EoiDeactive;
