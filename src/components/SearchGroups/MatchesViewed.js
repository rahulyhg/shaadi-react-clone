import React from 'react';
import PropTypes from '../../PropTypes';
import s from './styles';

const MatchesViewed = props => {
  const { searchInfo, searchResult } = props;
  const profiles = searchResult.items.map(result => result.uid);

  return (
    <s.searchGp data-test-selector={props.searchType}>
      <s.innerWrap>
        <s.title>{searchInfo.title}</s.title>
        <s.header>{searchInfo.header}</s.header>
        <s.viewedWrapper>
          <s.viewedInnerWrap>
            <s.multiProfileWrap>
              <s.multiProfile>
                <s.profileLink
                  target="_blank"
                  isExternal
                  img={props.profiles[profiles[0]].thumbnailBlur}
                  to={searchInfo.viewed_link}
                  order={1}
                />

                {props.searchResult.count >= 2 && (
                  <s.profileLink
                    target="_blank"
                    isExternal
                    img={props.profiles[profiles[1]].thumbnailBlur}
                    to={searchInfo.viewed_link}
                    order={2}
                  />
                )}

                {props.searchResult.count > 2 && (
                  <s.profileLink target="_blank" isExternal to={searchInfo.viewed_link} order={3}>
                    <s.reqCount>{`+${props.searchResult.count - 2}`}</s.reqCount>
                  </s.profileLink>
                )}
              </s.multiProfile>
            </s.multiProfileWrap>
            <s.multiProfileText>
              Looks like you have viewed all the matches here,<br />
              but some of them are definitely worth a second look!
            </s.multiProfileText>
          </s.viewedInnerWrap>
        </s.viewedWrapper>
      </s.innerWrap>
    </s.searchGp>
  );
};
MatchesViewed.propTypes = {
  profiles: PropTypes.objectOf(PropTypes.shape(PropTypes.searchProfile)).isRequired,
  searchInfo: PropTypes.shape({
    header: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  searchResult: PropTypes.shape({
    ...PropTypes.results,
    permalink: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape(PropTypes.searchItem)).isRequired,
  }).isRequired,
  searchType: PropTypes.string.isRequired,
};

export default MatchesViewed;
