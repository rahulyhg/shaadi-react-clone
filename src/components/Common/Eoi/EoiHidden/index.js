import React from 'react';
import PropTypes from '../../../../PropTypes';
import { showDeleteBtn } from '../utils';
import s from './styles';

const EoiHidden = props => {
  const { hisHer } = props;
  const msgTextMap = {
    selfDeleted: `Member has deleted ${hisHer.toLowerCase()} Profile`,
    systemDeleted: 'The profile has been deleted.',
    defaultDeleted: `Member has decided to keep ${hisHer.toLowerCase()} profile hidden. Please check again after a few days`,
    selfHidden: `Member has decided to keep ${hisHer.toLowerCase()} profile hidden. Please check again after a few days`,
    systemHidden: `The profile has been temporarily hidden. Please check again after a few days.`,
  };
  switch (props.type) {
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
    case 'featured': {
      return <div>{msgTextMap[props.hiddenReason]}</div>;
    }
    default:
      return null;
  }
};

EoiHidden.defaultProps = {
  isHorizontal: false,
  listType: '',
};
EoiHidden.propTypes = {
  type: PropTypes.oneOf(['inbox', 'profile', 'list', 'grid']).isRequired,
  hisHer: PropTypes.string.isRequired,
  hiddenReason: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  isHorizontal: PropTypes.bool,
  membershipTags: PropTypes.membershipTags.isRequired,
};
export default EoiHidden;
