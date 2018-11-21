import React from 'react';
import PropTypes from '../../../../PropTypes';
import s from './styles';

const EoiDefault = props => (
  <s.GridStyle>
    <s.InvitationBtnContainer isVisible>
      <s.InvitationHeading isGridItem isVisible>
        +{props.viewMorecount - 21} more
      </s.InvitationHeading>
      <s.InvitationGridWrap>
        <s.InvitationBtn isVisible hasMore isCarousel onClick={() => window.open(props.listUrl, '_blank')}>
          View more
        </s.InvitationBtn>
      </s.InvitationGridWrap>
    </s.InvitationBtnContainer>
  </s.GridStyle>
);

EoiDefault.propTypes = {
  listUrl: PropTypes.string.isRequired,
  viewMorecount: PropTypes.number.isRequired,
};

export default EoiDefault;
