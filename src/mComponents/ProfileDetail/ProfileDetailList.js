import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import LinearProgress from '@material-ui/core/LinearProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { SectionTitle, Content, Icon, TooltipStyles } from './stylesMobile';

class ProfileDetailList extends React.PureComponent {
  render() {
    const { items, title, children, loading, isGamified } = this.props;
    return (
      <div>
        <SectionTitle>{title}</SectionTitle>
        <Content style={{ position: 'relative' }}>
          {isGamified}
          <Card>
            {loading && (
              <div style={{ padding: '20px' }}>
                {' '}
                <LinearProgress color="secondary" size={1} />{' '}
              </div>
            )}
            {items.filter(item => item.desc && item.desc.length > 0).map(item => (
              <ListItem key={item.key}>
                <ListItemIcon>
                  <Icon icon={item.icon} />
                </ListItemIcon>
                <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
                  {item.desc}
                </Typography>
                {item.tooltip && (
                  <Tooltip id="background-info" disableTouchListener disableTriggerTouch title={item.tooltip} placement="bottom">
                    <HelpOutlineIcon style={TooltipStyles} />
                  </Tooltip>
                )}
              </ListItem>
            ))}
            {children}
          </Card>
        </Content>
      </div>
    );
  }
}

ProfileDetailList.defaultProps = {
  children: null,
  loading: false,
  isGamified: false,
};

const listItemPropTypes = {
  key: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

ProfileDetailList.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  items: PropTypes.arrayOf(PropTypes.shape(listItemPropTypes)).isRequired,
  loading: PropTypes.bool,
  isGamified: PropTypes.bool,
};

export default ProfileDetailList;
