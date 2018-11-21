import React from 'react';
import PropTypes from '../../../PropTypes';
import s from './styles';

const Rating = props => {
  const { rating, text } = props;
  return (
    <s.RatingReactionLabel isVisible={rating > 0}>
      <span>{text}</span>
    </s.RatingReactionLabel>
  );
};
Rating.defaultProps = {
  text: '',
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  text: PropTypes.string,
};

export default Rating;
