import React from 'react';
import StoppageFooter from '../Stoppage';
import s from './styles';

export default props => (
  <s.footerMainWrap>
    <s.footerInnerWrap>
      <s.footerInnerHead>Why register on Shaadi.com?</s.footerInnerHead>
      <s.ratedSiteMainWrap>
        <s.ratedSiteIconWrap>
          <s.ratedSiteIcon />
          No.1 rated site
          <span>
            Most recommended <br />matchmaking service
          </span>
        </s.ratedSiteIconWrap>
        <s.ratedSiteIconWrap>
          <s.successIcon />
          History of success
          <span>
            5 Million Matches <br /> and counting!
          </span>
        </s.ratedSiteIconWrap>
        <s.ratedSiteIconWrap>
          <s.privacyIcon />
          100% Privacy
          <span>
            100% Control on your <br /> Photos and info
          </span>
        </s.ratedSiteIconWrap>
        <s.ratedSiteIconWrap>
          <s.secureIcon />
          Fully secure
          <span>
            Patent pending technology <br />for your safety
          </span>
        </s.ratedSiteIconWrap>
      </s.ratedSiteMainWrap>
    </s.footerInnerWrap>
    <StoppageFooter />
  </s.footerMainWrap>
);
