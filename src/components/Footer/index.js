import PropTypes from 'prop-types';
import React from 'react';
import PaymentFooter from './PaymentFooter';
import { isPaymentPage } from '../Common/CarouselPageUtils';
import s from './styles';

const Footer = props => (
  <s.Footer>
    {isPaymentPage ? (
      <PaymentFooter />
    ) : (
      <div>
        <s.FooterInnerMainWrap>
          <s.FooterInnerWrap isChatOpen={props.isChatOpen} windowWidth={props.windowWidth}>
            <s.Container>
              <s.Nav>
                <s.Link to="/introduction/index/letter-from-cmd" isExternal target="_blank" rel="noreferrer noopener">
                  About us
                </s.Link>
                <s.Link isExternal target="_blank" rel="noreferrer noopener" to="http://www.selectshaadi.com/select?mlogin=LSH76766703&amp">
                  Select Shaadi
                </s.Link>
                <s.Link isExternal target="_blank" rel="noreferrer noopener" to="http://blog.shaadi.com">
                  Shaadi Blog
                </s.Link>
                <s.Link isExternal target="_blank" rel="noreferrer noopener" to="/shaadi_info/matrimonial_success_stories/index.php">
                  Success Stories
                </s.Link>
                <s.Link isExternal target="_blank" rel="noreferrer noopener" to="http://www.shaadicentre.com">
                  Shaadi Centres
                </s.Link>
                <s.Link isExternal target="_blank" rel="noreferrer noopener" to="/shaadi-info/index/contact-us">
                  Contact Us
                </s.Link>
                <s.Link to="http://people-group.com/vacancies.php" isExternal target="_blank" rel="noreferrer noopener">
                  Work with us
                </s.Link>
                <s.Link isExternal target="_blank" rel="noreferrer noopener" to="/services/mobile">
                  Download the App
                </s.Link>
                {props.mobileAppLinks.map(link => (
                  <s.IconLink isExternal target="_blank" rel="noreferrer noopener" icon={link.platform} to={link.url} key={link.key}>
                    {link.platform}
                  </s.IconLink>
                ))}
              </s.Nav>
            </s.Container>
          </s.FooterInnerWrap>
        </s.FooterInnerMainWrap>
        <s.FooterInnerWrap isChatOpen={props.isChatOpen} windowWidth={props.windowWidth}>
          <s.Container>
            <s.CopyrightWrap>
              <s.CopyLeft>
                <s.Link isExternal target="_blank" rel="noreferrer noopener" to="/customer-relations/faq/privacy-tips">
                  Be Safe Online
                </s.Link>
                <s.Link isExternal target="_blank" rel="noreferrer noopener" to="/shaadi-info/index/privacy">
                  Privacy Policy
                </s.Link>
                <s.Link isExternal target="_blank" rel="noreferrer noopener" to="/shaadi-info/index/terms">
                  Terms of Use
                </s.Link>
                <s.Link isExternal target="_blank" rel="noreferrer noopener" to="/sitemap">
                  Site Map
                </s.Link>
              </s.CopyLeft>
              <s.CopyRight>
                Passionately created by &nbsp;
                <s.CopyrightLink isExternal to="http://people-group.com/" target="_blank" rel="noreferrer noopener nofollow">
                  People Group
                </s.CopyrightLink>
                <s.CopyRightText>© 1996-2018 Shaadi.com - {"The World's"} No.1 Matchmaking Service™</s.CopyRightText>
              </s.CopyRight>
            </s.CopyrightWrap>
          </s.Container>
        </s.FooterInnerWrap>
      </div>
    )}
  </s.Footer>
);

Footer.defaultProps = {
  mobileAppLinks: [],
  isChatOpen: true,
};

const appLinkProps = PropTypes.shape({
  platform: PropTypes.string,
  url: PropTypes.string,
});

Footer.propTypes = {
  mobileAppLinks: PropTypes.arrayOf(appLinkProps),
  windowWidth: PropTypes.number.isRequired,
  isChatOpen: PropTypes.bool,
};

export default Footer;
