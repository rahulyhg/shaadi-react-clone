import React from 'react';
import s from './styles';
import PropTypes from '../../../PropTypes';

const TopBar = props => (
  <s.Topbar>
    <s.Container>
      <s.LogoWrapper>
        {props.logo &&
          !props.isNative && (
            <s.LogoLink
              to={props.logo.url}
              isExternal={props.logo.isExternal}
              title={props.logo.img && props.logo.img.title}
              role="navigation"
            >
              <img
                src={props.logo.img && props.logo.img.src}
                alt={props.logo.img && props.logo.img.alt}
                title={props.logo.img && props.logo.img.title}
              />
            </s.LogoLink>
          )}
      </s.LogoWrapper>
      <s.RightWrapper isActive={!!props.nextUrl} to={props.nextUrl} />
    </s.Container>
  </s.Topbar>
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

TopBar.propTypes = {
  logo: PropTypes.shape(imagePropTypes).isRequired,
  nextUrl: PropTypes.string.isRequired,
  isNative: PropTypes.bool.isRequired,
};

export default TopBar;
