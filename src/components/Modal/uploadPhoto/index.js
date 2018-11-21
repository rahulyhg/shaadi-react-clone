import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';
import ss from '../styles';
import Tooltip from '../../Common/Tooltip';

const UploadPhoto = props => (
  <s.UploadPhotoWrapper>
    <ss.Header isReportMisuse source="uploadPhoto">
      <s.LayerCloseBtn onClick={props.onModalClose} />
    </ss.Header>
    <ss.Content isTextCentered>
      <s.UploadTitle>To view Member’s Photos, please upload your Photo</s.UploadTitle>
      <s.UploadBtn isExternal to="/my-shaadi/photo?lnkref=LayerFramework-GridView">
        Upload Now
      </s.UploadBtn>

      <s.UploadCaption>
        100% Privacy controls available
        <Tooltip
          trigger="hover"
          placement="bottom"
          offset={[0, -5]}
          isQuestionMark
          tooltip={{
            body: [
              {
                key: 'beh',
                items: [
                  {
                    type: 'text',
                    key: 'bleh',
                    text: 'You can choose to hide/unhide',
                  },
                  {
                    type: 'text',
                    key: 'bleh',
                    text: ' Photos later in Privacy Settings.',
                  },
                ],
              },
            ],
          }}
        />
      </s.UploadCaption>
    </ss.Content>
  </s.UploadPhotoWrapper>
);

UploadPhoto.propTypes = {
  onModalClose: PropTypes.func.isRequired,
};

export default UploadPhoto;
