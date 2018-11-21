import React from 'react';
import PropTypes from '../../PropTypes';
import { Container } from './styles';

class ProfileCard extends React.PureComponent {
  render() {
    return <Container>{this.props.children}</Container>;
  }
}

ProfileCard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProfileCard;
