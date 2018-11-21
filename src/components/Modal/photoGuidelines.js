import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import React from 'react';
import s from '../../pages/MyPhotos/styles';

const PhotoGuidelines = props => (
  <div>
    <s.MessageHead>
      <s.MessageLayerClose>
        <s.MessageLayerCloseLink id="close-photo-guidelines-modal" onClick={props.onModalClose} />
      </s.MessageLayerClose>
      Guidelines for adding photos to your profile
    </s.MessageHead>
    <s.MessageLayerMain>
      <s.GuidelinesBg>
        <Scrollbars autoHeight autoHeightMin={450}>
          <s.PhotosLayerWrap>
            <s.PhotosUploadWrap>
              <s.PhotosUploadLeft>
                <s.PhotosCanUpload>Photos You can upload</s.PhotosCanUpload>
                <s.photoView>
                  <s.CloseupWrapper>
                    <s.PhotoGuidelinePic gender={props.gender} backgroundLeftMale="-131px" backgroundLeftFemale="-586px" />Close Up
                  </s.CloseupWrapper>
                  <s.CloseupWrapper>
                    <s.PhotoGuidelinePic gender={props.gender} backgroundLeftMale="-200px" backgroundLeftFemale="-656px" />Full View
                  </s.CloseupWrapper>
                </s.photoView>
              </s.PhotosUploadLeft>
              <s.PhotosUploadRight>
                <s.PhotosCanotUpload>Photos You Cannot Upload</s.PhotosCanotUpload>
                <s.PhotosUploadRightWrap>
                  <s.CloseupWrapper>
                    <s.PhotoGuidelinePic gender={props.gender} backgroundLeftMale="-268px" backgroundLeftFemale="-727px" />Side Face
                  </s.CloseupWrapper>
                  <s.CloseupWrapper>
                    <s.PhotoGuidelinePic gender={props.gender} backgroundLeftMale="-337px" backgroundLeftFemale="-795px" />Blur
                  </s.CloseupWrapper>
                  <s.CloseupWrapper>
                    <s.PhotoGuidelinePic gender={props.gender} backgroundLeftMale="-410px" backgroundLeftFemale="-869px" />Group
                  </s.CloseupWrapper>
                  <s.CloseupWrapper>
                    <s.PhotoGuidelinePic gender={props.gender} backgroundLeftMale="-481px" backgroundLeftFemale="-941px" />Watermark
                  </s.CloseupWrapper>
                </s.PhotosUploadRightWrap>
              </s.PhotosUploadRight>
            </s.PhotosUploadWrap>
            <s.guidelineGreyBg>
              <s.guidelineHdOne>Basic Rules:</s.guidelineHdOne>
              <s.GuidelineText>Smile. Your matches are more likely to respond.</s.GuidelineText>
              <s.GuidelineText>Add recent and clear photos.</s.GuidelineText>
              <s.GuidelineText>
                You can upload 20 photos to your profile. Each photo must be less than 15 MB and in jpg, gif,<br />
                png, bmp or tiff format.
              </s.GuidelineText>

              <s.guidelineHdTwo>Beyond these basic rules, here are some reasons we reject photos:</s.guidelineHdTwo>

              <s.GuidelineText>You are the focus of your profile. Do not add group photos.</s.GuidelineText>
              <s.GuidelineText>Sideways or upside-down photos are likely to be rejected.</s.GuidelineText>
              <s.GuidelineText>
                Watermarked, digitally enhanced, morphed photos or photos with your personal information<br />
                will be rejected.
              </s.GuidelineText>
              <s.GuidelineText>
                Do not upload irrelevant photographs such as celebrity photos or obscene photos. It may lead <br />
                to deactivation of your profile and membership.
              </s.GuidelineText>
              <s.GuidelineText>Do not upload photograph which shows you with a cigarette / cigar.</s.GuidelineText>

              <s.guidelineNote>
                Photos will be screened, optimized and added to your profile within 2 hours, after which your photos will be visible, based
                on your privacy options.
              </s.guidelineNote>
            </s.guidelineGreyBg>
          </s.PhotosLayerWrap>
        </Scrollbars>
      </s.GuidelinesBg>
    </s.MessageLayerMain>
  </div>
);

PhotoGuidelines.defaultProps = {};

PhotoGuidelines.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  gender: PropTypes.string.isRequired,
};

export default PhotoGuidelines;
