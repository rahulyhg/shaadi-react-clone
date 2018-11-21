import { parse } from 'qs';
import PropTypes from 'prop-types';
import React from 'react';
import { isCarouselProfilePage, getReferrerUrl } from '../CarouselPageUtils';
import s from './styles';

const ProfileQueue = props => {
  const { prevUrl, prevText, nextUrl, nextText, backText, count, source, nextUid } = props.pagination;
  const backUrl = source === 'similar_profile' ? '' : props.pagination.backUrl;
  const { profileid = '' } = prevUrl ? parse(prevUrl.split('?')[1]) : { profileid: '' };
  const daTracking = (uid, event = 'profile_view_on_next') => {
    uid && props.daTracking && props.daTracking(event, { uid });
  };
  const isCarouselLastProfileUrl = nextText === 'View My Matches' && isCarouselProfilePage;
  return (
    <s.ProfileNavWrapper isVisible profilePageBucket={props.profilePageBucket} isBottom={props.isBottomProfileQueue}>
      {!isCarouselProfilePage &&
        ['B', 'C'].includes(props.profilePageBucket) &&
        props.isBottomProfileQueue &&
        backText && (
          <s.ProfileNavBackBtn
            to={backUrl}
            isExternal={source === 'unified'}
            isDisabled={!backUrl}
            title={backText}
            profilePageBucket={props.profilePageBucket}
            isBottom={props.isBottomProfileQueue}
          >
            <s.BackArrow isPageMasked={props.isPageMasked} />
            {backText}
          </s.ProfileNavBackBtn>
        )}
      {['B', 'C'].includes(props.profilePageBucket) && backText && <span />}
      <s.ProfileNavBtns profilePageBucket={props.profilePageBucket} isBottom={props.isBottomProfileQueue}>
        {props.isBottomProfileQueue &&
          count > 0 && (
            <s.ProfileNavHeading isPageMasked={props.isPageMasked} profilePageBucket={props.profilePageBucket}>
              {count} more Profile{count > 1 ? 's' : ''}
              <s.ProfileNavArrow profilePageBucket={props.profilePageBucket} />
            </s.ProfileNavHeading>
          )}
        {prevText && (
          <s.ProfileNavBtn
            to={prevUrl}
            isExternal={false}
            isPrevBtn
            isDisabled={!prevUrl}
            onClick={() => daTracking(profileid)}
            profilePageBucket={props.profilePageBucket}
            isBottom={props.isBottomProfileQueue}
          >
            {props.isBottomProfileQueue || !props.pagination.prevSectionInfo
              ? [<s.PrevIconBottom key="prevBtm" isPageMasked={props.isPageMasked} />, prevText]
              : prevUrl && (
                  <s.PaginationSection>
                    <s.paginationText isPrev>
                      <s.PrevIcon />
                      {prevText}
                    </s.paginationText>
                    <s.ImgWrap>
                      <s.overlay key="prevOverlay" />
                      {['photo_request', 'no_photo'].includes(props.pagination.prevSectionInfo.iconStatus) ? (
                        <s.ImgDiv key="prevImgIcon" src={props.pagination.prevSectionInfo.icon} isPrev />
                      ) : (
                        <s.Img key="prevImgIcon" src={props.pagination.prevSectionInfo.icon} isPrev />
                      )}
                    </s.ImgWrap>
                  </s.PaginationSection>
                )}
          </s.ProfileNavBtn>
        )}
        {prevText && (
          <s.Separator isBottom={props.isBottomProfileQueue} isPageMasked={props.isPageMasked}>
            {' '}
            |{' '}
          </s.Separator>
        )}

        <s.navNextWrapper isBottom={props.isBottomProfileQueue} shouldShowIcon={!!props.pagination.prevSectionInfo}>
          {nextText && (
            <s.ProfileNavBtn
              to={isCarouselLastProfileUrl ? getReferrerUrl : nextUrl}
              isExternal={isCarouselLastProfileUrl}
              isNextBtn
              isDisabled={!nextUrl}
              onClick={() => daTracking(nextUid)}
              profilePageBucket={props.profilePageBucket}
              isBottom={props.isBottomProfileQueue}
            >
              {props.isBottomProfileQueue || !props.pagination.nextSectionInfo
                ? [nextText, <s.NextIconBottom key="nextBtm" isPageMasked={props.isPageMasked} />]
                : nextUrl && (
                    <s.PaginationSection>
                      {nextText === 'Next' && (
                        <s.ImgWrap>
                          {['photo_request', 'no_photo'].includes(props.pagination.nextSectionInfo.iconStatus) ? (
                            <s.ImgDiv src={props.pagination.nextSectionInfo.icon} />
                          ) : (
                            <s.Img src={props.pagination.nextSectionInfo.icon} />
                          )}
                        </s.ImgWrap>
                      )}
                      <s.paginationText>
                        {nextText}
                        <s.NextIcon />
                      </s.paginationText>
                    </s.PaginationSection>
                  )}
            </s.ProfileNavBtn>
          )}
        </s.navNextWrapper>
      </s.ProfileNavBtns>
    </s.ProfileNavWrapper>
  );
};

ProfileQueue.defaultProps = {
  daTracking: null,
  isPageMasked: false,
  isBottomProfileQueue: false,
  profilePageBucket: 'A',
  nextSectionInfo: null,
  prevSectionInfo: null,
};

ProfileQueue.propTypes = {
  pagination: PropTypes.shape({
    count: PropTypes.number,
    prevUrl: PropTypes.string,
    prevText: PropTypes.string,
    nextUrl: PropTypes.string,
    nextText: PropTypes.string,
    backUrl: PropTypes.string,
    backText: PropTypes.string,
    loading: PropTypes.bool,
    nextSectionInfo: PropTypes.shape({
      icon: PropTypes.string.isRequired,
      iconStatus: PropTypes.string,
    }),
    prevSectionInfo: PropTypes.shape({
      icon: PropTypes.string.isRequired,
      iconStatus: PropTypes.string,
    }),
  }).isRequired,
  daTracking: PropTypes.func,
  isPageMasked: PropTypes.bool,
  isBottomProfileQueue: PropTypes.bool,
  profilePageBucket: PropTypes.string,
};

export default ProfileQueue;
