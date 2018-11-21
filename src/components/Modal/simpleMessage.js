import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';

const SimpleMessage = props => (
  <s.UploadPhotoLayer isHelpMeLayer={props.data && props.data.isHelpMeLayer}>
    {props.data &&
      props.data.title && (
        <s.Header>
          <s.Title>{props.data.title}</s.Title>
          {<s.CloseIntentModalBtn id="close-simple-message-modal" onClick={props.onModalClose} />}
        </s.Header>
      )}
    <s.ContentWrap isHelpMeLayer={props.data && props.data.isHelpMeLayer}>{props.data && props.data.content}</s.ContentWrap>
  </s.UploadPhotoLayer>
);

SimpleMessage.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    title: PropTypes.string,
    isHelpMeLayer: PropTypes.bool,
  }).isRequired,
};

export default SimpleMessage;
