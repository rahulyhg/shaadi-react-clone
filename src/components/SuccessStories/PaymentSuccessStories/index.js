/* eslint-disable react/no-danger */
import PropTypes from 'prop-types';
import React from 'react';
import Carousel from '../../Common/Carousel';
import HtmlToReact from '../../Common/HtmlToReact';
import s from '../styles';

class PaymentSuccessStories extends React.PureComponent {
  renderItem(story) {
    const { wwwBaseUrl } = this.props;
    return (
      <s.PaymentCarousel key={story.id}>
        <s.DisplayFlex>
          <s.ThumbContainer isExternal to={`${wwwBaseUrl}/shaadi-info/matrimonial-success-stories/wedding?id=${story.id}`} target="_blank">
            <img src={story.photo} alt={story.title} width="114" height="79" />
          </s.ThumbContainer>
          <s.StoryContent isExternal to={`${wwwBaseUrl}/shaadi-info/matrimonial-success-stories/wedding?id=${story.id}`} target="_blank">
            <s.StoryHeading>{story.title}</s.StoryHeading>
            <HtmlToReact html={story.description} />...
          </s.StoryContent>
        </s.DisplayFlex>
      </s.PaymentCarousel>
    );
  }
  render() {
    const { stories, onAction } = this.props;
    const carouselProps = {
      width: 832,
      height: 89,
      maxComponentsInFrame: 1,
      slidesCnt: stories.items.length,
      steps: 1,
      isSuccessStory: true,
      onAction,
    };
    return (
      <s.StoryWrapper>
        <Carousel {...carouselProps}>{stories.items.map(story => this.renderItem(story))}</Carousel>
      </s.StoryWrapper>
    );
  }
}
PaymentSuccessStories.defaultProps = {
  onAction: () => null,
};
PaymentSuccessStories.propTypes = {
  stories: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    flash: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
};
export default PaymentSuccessStories;
