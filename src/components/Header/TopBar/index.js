/* eslint jsx-a11y/img-has-alt: 0 */
import React from 'react';
import PropTypes from '../../../PropTypes';
import PrimaryNav from '../PrimaryNav';
import Badge from '../Badge';
import s from './styles';

class Topbar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.checkExitIntent = this.checkExitIntent.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mouseleave', this.checkExitIntent);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseleave', this.checkExitIntent);
  }

  checkExitIntent(e) {
    if (e.clientY <= 0) {
      this.props.onAction('exitEvent');
    }
  }

  render() {
    return (
      <s.Topbar>
        <s.Container className="randomingClassApr" isChatOpen={this.props.isChatOpen} windowWidth={this.props.windowWidth}>
          <s.LogoWrapper>
            <s.LogoLink
              to={this.props.logo.url}
              isExternal={this.props.logo.isExternal}
              title={this.props.logo.img.title}
              role="navigation"
            >
              <img src={this.props.logo.img.src} alt={this.props.logo.img.alt} title={this.props.logo.img.title} />
            </s.LogoLink>
            <Badge {...this.props.headerBadge} />
          </s.LogoWrapper>
          <PrimaryNav
            items={this.props.navItems}
            activeIndex={this.props.activeIndex}
            isBottomBarVisible={this.props.isBottomBarVisible}
            onAction={this.props.onAction}
          />
          {this.props.children}
        </s.Container>
      </s.Topbar>
    );
  }
}

Topbar.defaultProps = {
  isBottomBarVisible: true,
};

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

const navItemPropTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  isExternal: PropTypes.bool,
  isActive: PropTypes.bool,
  count: PropTypes.number,
};

Topbar.propTypes = {
  children: PropTypes.children.isRequired,
  logo: PropTypes.shape(imagePropTypes).isRequired,
  isChatOpen: PropTypes.bool.isRequired,
  windowWidth: PropTypes.number.isRequired,
  isBottomBarVisible: PropTypes.bool,
  headerBadge: PropTypes.shape({
    img: PropTypes.shape(imgPropTypes).isRequired,
    url: PropTypes.string,
    isExternal: PropTypes.bool.isRequired,
    isVisible: PropTypes.bool.isRequired,
  }).isRequired,
  activeIndex: PropTypes.number.isRequired,
  navItems: PropTypes.arrayOf(PropTypes.shape(navItemPropTypes)).isRequired,
  onAction: PropTypes.func.isRequired,
};

export default Topbar;
