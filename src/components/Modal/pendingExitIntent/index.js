import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';

const pendingIntent = props => (
  <s.PendingIntentWrapper>
    <s.PhotoFakeLink onClick={() => props.doModalAction('modal/pendingExitIntent', props.data.uid, 'pendingInterestRespondNowPhoto')}>
      <s.PhotoLink>
        <s.Photo
          style={{
            backgroundImage: `url(${props.data.photoUrl})`,
          }}
        />
      </s.PhotoLink>
    </s.PhotoFakeLink>
    <s.IntentDetails>
      <s.IntentTitle>
        <s.TitleFakeLink onClick={() => props.doModalAction('modal/pendingExitIntent', props.data.uid, 'pendingInterestRespondNowName')}>
          {props.data.name}
        </s.TitleFakeLink>
        &nbsp;has invited you to Connect.
      </s.IntentTitle>
      <s.IntentDesc>
        {props.data.heShe} is waiting for your response. Be nice and get back to {props.data.himHer.toLowerCase()} even if {"it's"} a
        Decline.
      </s.IntentDesc>
      <s.IntentBtnsWrapper>
        <s.IntentBtn onClick={() => props.doModalAction('modal/pendingExitIntent', props.data.uid, 'pendingInterestRespondNow')} isPrimary>
          Respond now
        </s.IntentBtn>
        <s.IntentBtn onClick={() => props.doModalAction('modal/pendingExitIntent', props.data.uid, 'PendingInterestCancel')}>
          {"I'll"} do this later
        </s.IntentBtn>
      </s.IntentBtnsWrapper>
    </s.IntentDetails>
    <s.CloseIntentModalBtn onClick={props.onModalClose} />
  </s.PendingIntentWrapper>
);

pendingIntent.propTypes = {
  data: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    heShe: PropTypes.heShe,
    himHer: PropTypes.himHer,
    photoUrl: PropTypes.string.isRequired,
  }).isRequired,
  doModalAction: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default pendingIntent;
