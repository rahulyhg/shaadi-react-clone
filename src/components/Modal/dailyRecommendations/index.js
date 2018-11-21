import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';

const DailyRecommendations = props => (
  <s.DailyRecommendationsWrapper>
    <s.IntentWrapper>
      <s.RecommendationIcon />
      <s.RecommendationTitle>
        <s.LeftQuouteIcon />
        <s.RecommendationTitleText>Have you checked out your recommended Profiles for today?</s.RecommendationTitleText>
        <s.RightQuouteIcon />
      </s.RecommendationTitle>
    </s.IntentWrapper>
    <s.IntentDetails>
      <s.Recommendations>
        {props.data.items.map(profile => (
          <s.Recommendation key={profile.key}>
            <s.RecommendationPhotoLink
              onClick={() => props.doModalAction('modal/dailyRecommendations', profile.uid, 'viewDailyRecommendationsProfile')}
              isPrimary
            >
              <s.RecommendationPhoto
                style={{
                  backgroundImage: `url(${profile.photoUrl})`,
                }}
              />
            </s.RecommendationPhotoLink>
            <s.Name>{profile.name}</s.Name>
          </s.Recommendation>
        ))}
      </s.Recommendations>
      <s.RecommedationIntentBtnsWrapper>
        <s.IntentBtn
          isLongBtn
          onClick={() => props.doModalAction('modal/dailyRecommendations', null, 'viewDailyRecommendations')}
          isPrimary
        >
          View recommendations now
        </s.IntentBtn>
        <s.IntentBtn isLongBtn onClick={() => props.doModalAction('modal/dailyRecommendations', null, 'dontViewDailyRecommendations')}>
          {"I'll"} do this later
        </s.IntentBtn>
      </s.RecommedationIntentBtnsWrapper>
      <s.CloseIntentModalBtn onClick={props.onModalClose} />
    </s.IntentDetails>
  </s.DailyRecommendationsWrapper>
);

DailyRecommendations.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        uid: PropTypes.string.isRequired,
        photoUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  onModalClose: PropTypes.func.isRequired,
  doModalAction: PropTypes.func.isRequired,
};

export default DailyRecommendations;
