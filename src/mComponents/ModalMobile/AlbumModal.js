import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from 'react-router-dom';
import PropTypes from '../../PropTypes';
import SlideShow from '../SlideShow';
import { CloseButton, AlbumContainer, ConnectIcon } from './styles';

class AlbumModal extends React.PureComponent {
  componentDidMount() {
    const { history } = this.props;
    const { search, pathname, hash } = window.location;
    const url = `${pathname}${search}#album`;
    hash === '#album' ? history.replace(url) : history.push(url);
    this.title = document.title;
    document.title = `Album - ${this.title}`;
    this.unlisten = history.listen(this.props.onModalClose);
  }

  componentWillUnmount() {
    this.unlisten();
    document.title = this.title;
  }

  render() {
    const { album, isConnectBtnVisible, onAction, onModalClose, isPhotoGamified, isLiteApp } = this.props;
    return (
      <AlbumContainer className="album-container">
        <CloseButton>
          <IconButton aria-label="Close" style={{ color: '#fff', opacity: 0.8 }} onClick={onModalClose}>
            <CloseIcon />
          </IconButton>
        </CloseButton>
        <SlideShow photos={album} isPhotoGamified={isPhotoGamified && !isLiteApp} />
        {isConnectBtnVisible &&
          !isPhotoGamified && (
            <Typography
              varaint="subheading"
              align="center"
              style={{
                color: '#fff',
                fontSize: '18px',
                flex: '1 0 56px',
                'align-items': 'center',
                display: 'flex',
                'justify-content': 'center',
              }}
            >
              Like this Profile?
              <Button onClick={() => onAction('connect_mobile')}>
                <ConnectIcon />
              </Button>
            </Typography>
          )}
      </AlbumContainer>
    );
  }
}

AlbumModal.propTypes = {
  album: PropTypes.arrayOf(PropTypes.string).isRequired,
  isConnectBtnVisible: PropTypes.bool.isRequired,
  onAction: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  history: PropTypes.history.isRequired,
  isPhotoGamified: PropTypes.bool.isRequired,
  isLiteApp: PropTypes.bool.isRequired,
};

export default withRouter(AlbumModal);
