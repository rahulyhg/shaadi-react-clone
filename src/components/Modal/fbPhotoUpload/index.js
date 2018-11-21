import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import s from './styles';
import ss from '../styles';
import constants from '../../../constants/constants';

class FBPhotoUpload extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      images: [],
      selectedImagesCount: 0,
    };

    this.onTabClick = this.onTabClick.bind(this);
    this.onImageSelect = this.onImageSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.renderTabs = this.renderTabs.bind(this);
    this.renderThumbnails = this.renderThumbnails.bind(this);
  }

  componentWillReceiveProps(props) {
    if (this.props.data.albums !== props.data.albums) {
      this.setState({
        albums: props.data.albums,
      });
    }

    if (this.props.data.imageURLs !== props.data.imageURLs) {
      const images = [];
      for (const imageURL of props.data.imageURLs) {
        images.push({
          url: imageURL,
          selected: false,
        });
      }
      this.setState({ images });
    }

    if (props.data.redirectToAlbums) {
      this.props.headerAction('fbPhotoUploaded', { data: this.props.data });
    }
  }

  onTabClick(albumID) {
    const albums = [...this.state.albums];
    albums.map(album => {
      album.selected = album.id === albumID;
      return null;
    });

    this.setState({ albums });
    this.props.headerAction('fbPhotoUploadAlbum', albumID, { data: this.props.data });
  }

  onImageSelect(imageURL) {
    const images = [...this.state.images];

    let selectedImagesCount = this.state.selectedImagesCount;
    const canUploadImagesCount = constants.MAX_PHOTO_COUNTS - this.props.data.existingPhotoCount;
    images.map((image, index) => {
      const selectBoolVal = !image.selected;
      if (
        (selectedImagesCount < canUploadImagesCount || (selectedImagesCount === canUploadImagesCount && !selectBoolVal)) &&
        image.url === imageURL
      ) {
        image.selected = selectBoolVal;
        selectedImagesCount = image.selected ? selectedImagesCount + 1 : selectedImagesCount - 1;
      }
      return null;
    });

    if (this.state.selectedImagesCount === canUploadImagesCount && this.state.selectedImagesCount === selectedImagesCount) {
      let alertMsg = 'You have reached the maximum limit of 20 photo uploads.';
      if (this.props.data.existingPhotoCount) {
        alertMsg += `You currently have ${
          this.props.data.existingPhotoCount
        } photos on your profile. Please remove a few photos to proceed.`;
      }
      alert(alertMsg); // eslint-disable-line no-alert
    }

    this.setState({ ...this.state, ...{ images, selectedImagesCount } });
  }

  onSubmit() {
    const images = [...this.state.images];
    const imageURLs = images.filter(image => image.selected).map(image => image.url);
    if (imageURLs.length) {
      this.props.headerAction('fbPhotoUploadSubmit', imageURLs, { data: this.props.data });
    }
  }

  renderTabs() {
    return (
      <s.FBTabWrap>
        <s.FBTabTitle>Albums</s.FBTabTitle>
        <Scrollbars autoHeight autoHeightMin={343}>
          <s.FBTabList>
            {this.state.albums.map(album => (
              <s.FBTabListItem
                className="fb-albums"
                id={`fb-album-${album.id}`}
                key={album.id}
                isActiveTab={album.selected}
                onClick={() => this.onTabClick(album.id)}
              >
                <s.FBTabLabel>{album.name}</s.FBTabLabel>
                <s.FBTabCountWrap>
                  <s.FBTabCount>
                    {album.count}
                    <s.FBTabCountArrow />
                  </s.FBTabCount>
                </s.FBTabCountWrap>
              </s.FBTabListItem>
            ))}
          </s.FBTabList>
        </Scrollbars>
      </s.FBTabWrap>
    );
  }

  renderThumbnails() {
    return (
      <s.FBThumbnailWrap>
        <Scrollbars autoHeight autoHeightMin={355}>
          {(this.props.data.showLoader && <s.FBLoader />) || (
            <s.FBAlbumContainer>
              {this.state.images.map(image => (
                <s.FBPhotoWrap
                  className="fb-img-wrap"
                  key={image.url}
                  isSelectedThumbNail={image.selected}
                  onClick={() => this.onImageSelect(image.url)}
                >
                  <s.FBThumbnail fbImageURL={image.url} />
                  {image.selected && <s.FBThumbnailInputIcon />}
                </s.FBPhotoWrap>
              ))}
            </s.FBAlbumContainer>
          )}
        </Scrollbars>
      </s.FBThumbnailWrap>
    );
  }

  render() {
    return (
      <s.FBPuploadWrap>
        <s.FBImportPhotoWrap>
          <ss.Header>
            <s.FBPuploadTitle>My Photos</s.FBPuploadTitle>
            <ss.CloseModalBtn id="close-import-from-facebook-modal" onClick={this.props.onModalClose} />
          </ss.Header>

          <s.FBImportPhotoTitle>Add profile photo from your Facebook albums</s.FBImportPhotoTitle>

          <s.FBContentWrap>
            {this.renderTabs()}
            {this.renderThumbnails()}
          </s.FBContentWrap>

          <s.FBUploadBtnWrap>
            <s.FBUploadBtn id="import-photos-from-facebook" onClick={this.onSubmit}>
              Continue
            </s.FBUploadBtn>
          </s.FBUploadBtnWrap>
        </s.FBImportPhotoWrap>
      </s.FBPuploadWrap>
    );
  }
}

FBPhotoUpload.propTypes = {
  data: PropTypes.shape({
    uid: PropTypes.string,
    name: PropTypes.string,
    imageURLs: PropTypes.arrayOf(PropTypes.string),
    albums: PropTypes.arrayOf(
      PropTypes.shape({
        count: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequired,
      }),
    ),
    showLoader: PropTypes.bool.isRequired,
    redirectToAlbums: PropTypes.bool.isRequired,
    existingPhotoCount: PropTypes.number.isRequired,
  }).isRequired,
  onModalClose: PropTypes.func.isRequired,
  headerAction: PropTypes.func.isRequired,
};

export default FBPhotoUpload;
