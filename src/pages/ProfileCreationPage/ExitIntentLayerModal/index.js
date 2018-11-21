import React from 'react';
import PropTypes from 'prop-types';
import withModal from '../../../components/HOC/withModal';
import s from '../../../components/Modal/styles';
import MiniProfile from './MiniProfile';
// @todo separate exit intent layer css to here

const ExitIntentLayer = props => (
  <s.ExitIntentWrapper>
    <s.ExitIntentTitleText>{`${props.hisHerOrYour} Profile is still Incomplete!`}</s.ExitIntentTitleText>
    <s.ExitIntentSubTitleText>{`Sign up free to connect with ${props.hisHerOrYour.toLowerCase()} Matches`}</s.ExitIntentSubTitleText>
    <s.ExitIntentDetails>
      <s.EIRecommendations>{props.profiles.map(profile => <MiniProfile {...profile} key={profile.memberlogin} />)}</s.EIRecommendations>
      <s.RecommedationIntentBtnsWrapper>
        <s.IntentBtn onClick={props.onModalClose} isPrimary>
          {`Ok, let's Proceed`}
        </s.IntentBtn>
      </s.RecommedationIntentBtnsWrapper>
      <s.CloseIntentModalBtn onClick={props.onModalClose} />
    </s.ExitIntentDetails>
  </s.ExitIntentWrapper>
);

ExitIntentLayer.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.shape(MiniProfile.propTypes)).isRequired,
  onModalClose: PropTypes.func.isRequired,
  hisHerOrYour: PropTypes.string.isRequired,
};

export default withModal(ExitIntentLayer);
