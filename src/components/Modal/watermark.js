import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';

const Watermark = props => (
  <s.WatermarkWrapper>
    <s.Header>
      <s.Title>FAQs for watermark</s.Title>
      <s.CloseModalBtn onClick={props.onModalClose} />
    </s.Header>
    <s.Content>
      <s.Question>
        Why do some images have the {'"'}
        shaadi.com watermarks
        {'"'} written on them while others {"don't"}
        ?
      </s.Question>
      <s.Answer>
        We received numerous member feedback that Shaadi.com watermark across the photograph was an unpleasant experience while viewing a{' '}
        {"member's"} photo. So we have decided that all images post Oct 08 2015 would not carry a watermark across the photograph.
      </s.Answer>
      <br />
      <s.Question>How do I remove the Shaadi.com Watermark from my image?</s.Question>
      <s.Answer>Please upload the photos again and the watermark will be removed as per the default setting.</s.Answer>
    </s.Content>
  </s.WatermarkWrapper>
);

Watermark.propTypes = {
  onModalClose: PropTypes.func.isRequired,
};

export default Watermark;
