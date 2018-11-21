import React from 'react';
import PropTypes from '../../../../PropTypes';
import s from './styles';
import Spinner from '../../../Common/Spinner';
import SvgLoader from '../../../Common/SvgLoader';
import EoiMessage from '../EoiMessage';
import ss from '../styles';

const EoiLoading = props => {
  switch (props.type) {
    case 'premiumCarousel':
      return (
        <ss.carouselConnectedBtn>
          <ss.connectedText>
            <SvgLoader isVisible isPremiumCarousel />
          </ss.connectedText>
        </ss.carouselConnectedBtn>
      );
    case 'dashboard':
      return <EoiMessage type={props.type} status={props.actionType === 'accept' ? 'accepted' : 'loading'} />;
    case 'featured':
    case 'inbox':
    case 'similarProfile':
      return (
        <s.LoadingWrapper isInbox={['featured', 'inbox'].includes(props.type)} type={props.type}>
          <SvgLoader isVisible />
        </s.LoadingWrapper>
      );
    case 'list':
      return (
        <s.LoadingWrapper isList>
          <SvgLoader isVisible />
        </s.LoadingWrapper>
      );
    case 'profile':
    case 'dailyRecommendations':
      if (['B', 'C'].includes(props.profilePageBucket)) {
        return (
          <s.LoadingWrapper isProfile>
            <SvgLoader isVisible />
          </s.LoadingWrapper>
        );
      }
      return (
        <s.LoadingWrapper>
          <Spinner isVisible />
        </s.LoadingWrapper>
      );
    case 'grid':
    case 'chat':
    default:
      return (
        <s.LoadingWrapper>
          <Spinner isVisible />
        </s.LoadingWrapper>
      );
  }
};

EoiLoading.defaultProps = {
  profilePageBucket: 'A',
  actionType: '',
};

EoiLoading.propTypes = {
  type: PropTypes.oneOf([
    'grid',
    'list',
    'profile',
    'chat',
    'premiumCarousel',
    'dailyRecommendations',
    'inbox',
    'featured',
    'similarProfile',
  ]).isRequired,
  profilePageBucket: PropTypes.string,
  actionType: PropTypes.string,
};

export default EoiLoading;
