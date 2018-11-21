import PropTypes from 'prop-types';
import React from 'react';
import SuccessStories from '../../../components/SuccessStories';
import './payment-style.css';

const SuccessStory = ({ successStoriesProps }) => (
  <React.Fragment>
    <div className="main_wrapper">
      <div className="select_wrapper">
        <div className="personalised_heading" data-test-selector="success_heading">
          Year 2018 - Success Stories
        </div>
        <div className="success_story_wrapper">{successStoriesProps.stories.items && <SuccessStories {...successStoriesProps} />}</div>
      </div>
    </div>
    <div className="spacer_20" />
  </React.Fragment>
);
SuccessStory.propTypes = {
  ...PropTypes.successStoriesProps,
};
export default SuccessStory;
