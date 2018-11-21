import React from 'react';
import PropTypes from '../../../PropTypes';
import LangDropDown from '../../../components/LangDropDown';
import s from './styles';

const StoppageHeader = props => (
  <div>
    <s.Topbar>
      <s.Container>
        <s.LogoWrapper>
          {props.logo &&
            !props.isNative && (
              <s.LogoLink
                id="logo-link"
                to={props.disableLogoClick ? '' : props.logo.url}
                isExternal={props.logo.isExternal}
                title={props.logo.img && props.logo.img.title}
                role="navigation"
              >
                <img
                  id="logo"
                  src={props.logo.img && props.logo.img.src}
                  alt={props.logo.img && props.logo.img.alt}
                  title={props.logo.img && props.logo.img.title}
                />
              </s.LogoLink>
            )}
        </s.LogoWrapper>
        {props.canShowSkip && (
          <s.RightWrapper>
            <s.SkipLinkHoverEffect>
              <s.SkipLink id="page-skip-link" isActive={!!props.nextUrl} to={props.nextUrl} arrow="right" isExternal />
            </s.SkipLinkHoverEffect>
          </s.RightWrapper>
        )}
        <LangDropDown litem={props.multiLang.litem} selectedLang={props.multiLang.slang} />
      </s.Container>
    </s.Topbar>
    <s.BottomBar />
  </div>
);

const imgPropTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
};

const imagePropTypes = {
  img: PropTypes.shape(imgPropTypes).isRequired,
  url: PropTypes.string,
  isExternal: PropTypes.bool.isRequired,
};

StoppageHeader.defaultProps = {
  disableLogoClick: false,
  multiLang: { slang: 'en-US', litem: 'false' },
};

StoppageHeader.propTypes = {
  logo: PropTypes.shape(imagePropTypes).isRequired,
  nextUrl: PropTypes.string.isRequired,
  isNative: PropTypes.bool.isRequired,
  canShowSkip: PropTypes.bool.isRequired,
  disableLogoClick: PropTypes.bool,
  multiLang: PropTypes.shape({ slang: PropTypes.string, litem: PropTypes.string }),
};

export default StoppageHeader;
