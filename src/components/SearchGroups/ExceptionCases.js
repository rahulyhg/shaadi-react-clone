import React from 'react';
import PropTypes from '../../PropTypes';
import s from './styles';

const ExceptionCases = props => {
  const { searchInfo, exceptionInfo, exceptionType } = props;
  switch (exceptionType) {
    case 'visitor_privacy': {
      return (
        <s.searchGp>
          <s.innerWrap>
            <s.title>{searchInfo.title}</s.title>
            <s.header>{searchInfo.header}</s.header>
            <s.viewedWrapper>
              <s.viewedInnerWrap>
                <s.userGuide>{exceptionInfo.messageText}</s.userGuide>
                <s.exceptionAction to={exceptionInfo.guideUrl} isExternal target="_blank">
                  Activate Now
                </s.exceptionAction>
              </s.viewedInnerWrap>
            </s.viewedWrapper>
          </s.innerWrap>
        </s.searchGp>
      );
    }
    default:
      return null;
  }
};

ExceptionCases.propTypes = {
  searchInfo: PropTypes.shape({
    header: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  exceptionInfo: PropTypes.shape({
    messageCode: PropTypes.string.isRequired,
    messageText: PropTypes.string.isRequired,
  }).isRequired,
  exceptionType: PropTypes.string.isRequired,
};

export default ExceptionCases;
