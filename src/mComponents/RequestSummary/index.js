import React from 'react';
import PropTypes from '../../PropTypes';
import { Box, Wrapper, ListLink, Heading } from './styles';

const getRequestConfig = (type, { count = 0 }) => {
  const typeMap = {
    requestAccepted: {
      Title: 'Accepted requests',
      Url: '/inbox/accepted/requests',
      heading: `${count} Requests are accepted`,
    },
    requestSent: {
      Title: 'Sent requests',
      Url: '/inbox/sent/requests',
      heading: `${count} Requests are sent`,
    },
  };
  return typeMap[type] || {};
};
const RequestSummary = props => {
  const { infoType, InfoData } = props;
  const configDetail = getRequestConfig(infoType, InfoData);
  return (
    <Box styles={props.style}>
      <Heading>{configDetail.Title}</Heading>
      <Heading type="desc">{configDetail.heading}</Heading>
      <Wrapper type="flexWrapRow">
        <Wrapper onClick={() => props.history.push(configDetail.Url)}>
          {InfoData.data.map(value => <Box key={value} type="circular" src={value.profilePic} />)}
          {InfoData.count > 2 && <Box type="circular">{`+${InfoData.count - 2}`}</Box>}
        </Wrapper>
        <ListLink to={configDetail.Url}>View All</ListLink>
      </Wrapper>
    </Box>
  );
};
RequestSummary.defaultProps = {
  style: {},
};
RequestSummary.propTypes = {
  infoType: PropTypes.string.isRequired,
  InfoData: PropTypes.shape({
    count: PropTypes.number.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.shape(PropTypes.history).isRequired,
};

export default RequestSummary;
