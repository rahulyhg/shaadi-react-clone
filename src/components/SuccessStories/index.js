import PropTypes from 'prop-types';
import React from 'react';
import PaymentSuccessStories from './PaymentSuccessStories';
import s from './styles';

const clip = (str, n) => (str.length > n ? `${str.slice(0, n - 1)}...` : `${str}`);

class SuccessStories extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeStoryIndex: 0,
    };
  }
  render() {
    const { isPayment, type, stories, wwwBaseUrl } = this.props;
    const paymentSuccessStoriesProps = { isPayment, stories, wwwBaseUrl };
    if (isPayment) {
      return <PaymentSuccessStories {...paymentSuccessStoriesProps} />;
    }
    let width = 201;
    let height = 146;
    let clipAt = 63;

    if (type === 'profile') {
      width = 310;
      height = 224;
      clipAt = 90;
    }

    if (stories.items.length === 0) {
      return null;
    }
    return (
      <s.SuccessStories profilePageBucket={this.props.profilePageBucket}>
        <s.Title profilePageBucket={this.props.profilePageBucket}>Success Stories</s.Title>
        {stories.loading && '...'}
        {stories.flash && <p style={{ fontStyle: 'oblique', textAlign: 'center' }}>{stories.flash}</p>}

        <s.StoriesWrapper>
          {stories.items.map((story, i) => (
            <s.Story key={story.id} isActive={this.state.activeStoryIndex === i}>
              {story.photo && <s.Photo src={story.photo} alt={story.title} width={width} height={height} />}
              <s.Name profilePageBucket={this.props.profilePageBucket}>{story.title}</s.Name>
              <s.Desc profilePageBucket={this.props.profilePageBucket}>
                {clip(story.description, clipAt)}
                <s.ReadMoreLink
                  isExternal
                  to={`${wwwBaseUrl}/shaadi-info/matrimonial-success-stories/wedding?id=${story.id}`}
                  target="_blank"
                >
                  Read full story
                </s.ReadMoreLink>
              </s.Desc>
            </s.Story>
          ))}
        </s.StoriesWrapper>
        <s.SliderDots>
          {stories.items.map((story, i) => (
            <s.Dot
              key={story.id}
              id={i}
              isActive={this.state.activeStoryIndex === i}
              onClick={() => this.setState({ activeStoryIndex: i })}
            />
          ))}
        </s.SliderDots>
      </s.SuccessStories>
    );
  }
}
SuccessStories.defaultProps = {
  isPayment: false,
  profilePageBucket: 'A',
};
SuccessStories.propTypes = {
  ...PropTypes.successStoriesProps,
};
export default SuccessStories;
