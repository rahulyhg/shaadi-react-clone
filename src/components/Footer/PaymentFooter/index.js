import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isCarouselProfilePage } from '../../Common/CarouselPageUtils';
import s from './styles';

const PaymentFooter = props => {
  const pageAB = (props.experiments && props.experiments.payment_page && props.experiments.payment_page.bucket) || '';
  const isRevampPage = !!(window.location.pathname === '/payment' && pageAB === 'B');
  if (window.location.pathname === '/payment' && pageAB === '') {
    return '';
  }
  return (
    <s.PaymentFooter>
      <s.PaymentFooterInnerWrap isRevampPage={isRevampPage} isProfilePage={isCarouselProfilePage}>
        <s.PaymentContainer isRevampPage={isRevampPage} isProfilePage={isCarouselProfilePage}>
          <s.FooterBg>
            <s.BottomLogo />
            <s.CompanyInfo isRevampPage={isRevampPage} isProfilePage={isCarouselProfilePage}>
              <b>
                <s.ShaadiBold>Shaadi.com</s.ShaadiBold>
              </b>, one of {"India's"} best known brands and the {"world's"} largest matrimonial service was founded with a simple objective
              - to help people find happiness. The company pioneered online matrimonials in 1996 and continues to lead the exciting
              matrimony category after more than a decade. By redefining the way Indian brides and grooms meet for marriage, Shaadi.com has
              created a world-renowned service that has touched over 35 million people.{' '}
              <s.CopyrightLink isExternal to="/introduction/index/letter-from-cmd" rel="noreferrer noopener" target="_blank">
                Learn more
              </s.CopyrightLink>
              <s.GreySmallArrow isExternal to="/introduction/index/letter-from-cmd" target="_blank" />
            </s.CompanyInfo>
            <s.SecureWrapper>
              <s.SecureImage isExternal to="/introduction/index/safety-privacy-security" rel="noreferrer noopener" target="_blank" />
              <s.ImproveShaadi>
                <s.HelpShaadiLink isExternal to="http://help.shaadi.com/hc/en-us/requests/new" rel="noreferrer noopener" target="_blank">
                  Help us improve Shaadi.com
                </s.HelpShaadiLink>
              </s.ImproveShaadi>
            </s.SecureWrapper>
          </s.FooterBg>
          <s.FooterBorder />
        </s.PaymentContainer>
      </s.PaymentFooterInnerWrap>
      <s.CopyrightsWrap isRevampPage={isRevampPage} isProfilePage={isCarouselProfilePage}>
        <s.CopyrightsLeft>
          <s.CopyrightsLink isExternal to="/introduction/index/letter-from-cmd" rel="noreferrer noopener" target="_blank">
            About us
          </s.CopyrightsLink>&nbsp; | &nbsp;
          <s.CopyrightsLink isExternal to="http://blog.shaadi.com" rel="noreferrer noopener" target="_blank">
            Blog
          </s.CopyrightsLink>&nbsp; | &nbsp;
          <s.CopyrightsLink isExternal to="http://people-group.com/vacancies.php" rel="noreferrer noopener" target="_blank">
            Work with us
          </s.CopyrightsLink>&nbsp; | &nbsp;
          <s.CopyrightsLink isExternal to="/shaadi-info/index/contact-us" rel="noreferrer noopener" target="_blank">
            Contact us
          </s.CopyrightsLink>&nbsp; | &nbsp;
          <s.CopyrightsLink isExternal to="/shaadi-info/index/privacy" rel="noreferrer noopener" target="_blank">
            Privacy Policy
          </s.CopyrightsLink>&nbsp; | &nbsp;
          <s.CopyrightsLink isExternal to="/shaadi-info/index/terms" rel="noreferrer noopener" target="_blank">
            Terms of Use
          </s.CopyrightsLink>&nbsp; | &nbsp;
          <s.CopyrightsLink isExternal to="/sitemap" rel="noreferrer noopener" target="_blank">
            Site Map
          </s.CopyrightsLink>
        </s.CopyrightsLeft>
        <s.CopyrightsRight>
          <span>&copy; 1996-{new Date().getFullYear()} Shaadi.com</span>&nbsp; | &nbsp;Passionately created by{' '}
          <s.CopyrightLink isExternal to="http://people-group.com/" rel="noreferrer noopener" target="_blank">
            People Group
          </s.CopyrightLink>
          <s.GreySmallArrow />
        </s.CopyrightsRight>
      </s.CopyrightsWrap>
    </s.PaymentFooter>
  );
};
PaymentFooter.defaultProps = {
  experiments: {
    payment_page: {
      bucket: '',
    },
  },
};
PaymentFooter.propTypes = {
  experiments: PropTypes.shape({
    payment_page: PropTypes.object.isRequired,
  }).isRequired,
};
const selector = state => ({
  experiments: state.session.settings.experiments,
});

export default connect(selector, {})(PaymentFooter);
