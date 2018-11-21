import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';
import ss from '../styles';

const titleMap = {
  hobbies: 'Interests',
  cuisines: 'Favourite Cuisine',
  music: 'Favourite Music',
  movies: 'Favourite Movies',
  books: 'Favourite Reads',
  sports: 'Sport / Fitness Activities',
  dressStyle: 'Preferred Dress Style',
};

const Interests = props => (
  <s.InterestsWrapper>
    <ss.Header>
      <ss.Title>Interests & More</ss.Title>
      <ss.CloseModalBtn onClick={props.onModalClose} />
    </ss.Header>
    <ss.Content>
      {Object.keys(props.items).map(key => (
        <s.InterestItem key={titleMap[key]}>
          <s.InterestLabel>{titleMap[key]}</s.InterestLabel>
          <s.InterestDesc>{props.items[key].join(', ')}</s.InterestDesc>
        </s.InterestItem>
      ))}
    </ss.Content>
  </s.InterestsWrapper>
);

Interests.propTypes = {
  items: PropTypes.objectOf(PropTypes.array).isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default Interests;
