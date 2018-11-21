import React from 'react';
import PropTypes from '../../../PropTypes';
import s from './styles';

const LinksBox = props => {
  const linksHtml = Object.keys(props.links).map(key => (
    <s.quickLinkWrap key={key} isHeading={props.links[key].isHeading}>
      <s.quickLink href={props.links[key].link} isHeading={props.links[key].isHeading}>
        {props.links[key].text}
      </s.quickLink>
    </s.quickLinkWrap>
  ));
  return (
    <div>
      <s.quickLinksUl>{linksHtml}</s.quickLinksUl>
    </div>
  );
};

LinksBox.propTypes = {
  links: PropTypes.shape({
    isHeading: PropTypes.bool,
    link: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
};

export default LinksBox;
