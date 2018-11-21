import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NoMatchesContainer } from './styles';

export const NoMatches = props => (
  <NoMatchesContainer>
    <Typography gutterBottom variant="title">
      {props.heading}
    </Typography>
    <Typography style={{ whiteSpace: 'pre-line' }}>{props.message}</Typography>
    <br />
    {props.isButtonVisible && (
      <Button variant="raised" color="secondary" onClick={() => props.onAction()}>
        {props.buttonText}
      </Button>
    )}
  </NoMatchesContainer>
);

NoMatches.defaultProps = {
  heading: 'NO MORE MATCHES',
  message: 'You have no more Matches in this section.',
  buttonText: 'More matches',
  isButtonVisible: true,
};

NoMatches.propTypes = {
  heading: PropTypes.string,
  message: PropTypes.string,
  buttonText: PropTypes.string,
  onAction: PropTypes.func.isRequired,
  isButtonVisible: PropTypes.bool,
};
