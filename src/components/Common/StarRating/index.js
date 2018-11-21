import React from 'react';
import PropTypes from '../../../PropTypes';
import Star from './Star';
import Rating from './Rating';
import s from './styles';

const fetchImage = props => {
  const img = ['hunkydory.svg', 'hunkydory-1.svg', 'hunkydory-2.svg', 'hunkydory-3.svg', 'hunkydory-4.svg', 'hunkydory-5.svg'];
  return img[props];
};

class StarRating extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
    };
    this.updateRating = this.updateRating.bind(this);
  }

  updateRating(rating) {
    this.setState({ rating });
    this.props.storeAnswers({ id: this.props.id, answer: rating.toString() });
  }

  render() {
    return (
      <s.WidgetWapper>
        <s.Widget>
          <s.RateExperienceBanner id="hunkydory" imgSrc={fetchImage(this.state.rating)} />
          <s.Question>{this.props.title}</s.Question>
          <s.RatingStars>
            <Star totalStars={5} rating={this.state.rating} updateRating={this.updateRating} layout={this.props.layout} />
          </s.RatingStars>
          <Rating rating={this.state.rating} text={this.props.choices[this.state.rating]} />
        </s.Widget>
      </s.WidgetWapper>
    );
  }
}
StarRating.defaultProps = {
  startsCount: 5,
  choices: {
    value: '',
    text: false,
  },
  layout: 'desktop',
};

StarRating.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  choices: PropTypes.shape({
    value: PropTypes.string,
    text: PropTypes.bool,
  }),
  storeAnswers: PropTypes.func.isRequired,
  layout: PropTypes.string,
};

export default StarRating;
