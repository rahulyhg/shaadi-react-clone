import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { SectionTitle, Content } from './stylesMobile';

const MAX_LENGTH = 160;

class ProfileContent extends React.PureComponent {
  state = { expanded: false };

  handleExpandClick = () => {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  };

  render() {
    const { title, content, classes, isGamified } = this.props;
    const { expanded } = this.state;
    if (!content) {
      return null;
    }
    const isLengthyContent = content.length > MAX_LENGTH;
    return (
      <div>
        {title && <SectionTitle>{title}</SectionTitle>}
        <Content style={{ position: 'relative' }}>
          {isGamified}
          <Card>
            <CardContent style={{ minHeight: isGamified && '50px', paddingBottom: isLengthyContent ? 0 : null }}>
              <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
                {`${content.substr(0, expanded ? content.length : MAX_LENGTH - 3)}${isLengthyContent && !expanded ? '...' : ''}`}
              </Typography>
            </CardContent>
            {!isGamified &&
              isLengthyContent && (
                <CardActions>
                  <IconButton
                    className={classnames(classes.expand, {
                      [classes.expandOpen]: this.state.expanded,
                    })}
                    onClick={this.handleExpandClick}
                    aria-expanded={this.state.expanded}
                    aria-label="Show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
              )}
          </Card>
        </Content>
      </div>
    );
  }
}

ProfileContent.defaultProps = {
  title: null,
  isGamified: false,
};

ProfileContent.propTypes = {
  title: PropTypes.string,
  content: PropTypes.node.isRequired,
  classes: PropTypes.shape({}).isRequired,
  isGamified: PropTypes.bool,
};

const styles = theme => ({
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

export default withStyles(styles)(ProfileContent);
