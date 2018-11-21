import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { FacetItemContainer } from './styles';
import FacetSelect from './FacetSelect';

class FacetItem extends React.Component {
  state = { isSelectVisible: false };
  handleSelectClose = () => {
    this.setState({ isSelectVisible: false });
  };
  handleSelectOpen = () => {
    this.setState({ isSelectVisible: true });
  };
  render() {
    const props = this.props;
    return (
      <div>
        <FacetItemContainer onClick={this.handleSelectOpen}>
          <Typography variant="subheading" color="textSecondary">
            {props.title}
          </Typography>
          <Typography variant="subheading" color="textSecondary">
            {props.selected}
            <KeyboardArrowRightIcon style={{ verticalAlign: 'middle' }} />
          </Typography>
        </FacetItemContainer>
        <FacetSelect
          isVisible={this.state.isSelectVisible}
          onFacetChange={props.onFacetChange}
          onCancel={this.handleSelectClose}
          {...props}
        />
      </div>
    );
  }
}

FacetItem.defaultProps = {};
FacetItem.propTypes = {
  onFacetChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
};

export default FacetItem;
