import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { BottomBarLink } from './styles';

class BottomLink extends React.PureComponent {
  componentDidMount() {
    this.scrollIntoView();
  }
  componentDidUpdate() {
    this.scrollIntoView();
  }
  scrollIntoView = () => {
    if (this.props.isActive) {
      try {
      const el = ReactDOM.findDOMNode(this.node); //eslint-disable-line
        el.scrollIntoView();
        const pel = el.parentElement;
        const  scrollLeft = pel.offsetWidth/2  - el.offsetWidth/2 ; //eslint-disable-line
        pel.scrollLeft = el.offsetLeft - scrollLeft;
      } catch (e) {
        console.log(e);
      }
    }
  };
  render() {
    const { isActive, to, isExternal, label, count } = this.props;
    return (
      <BottomBarLink
        ref={node => {
          this.node = node;
        }}
        isActive={isActive}
        to={to}
        isExternal={isExternal}
      >
        {label}
        {count && count !== '0' ? ` (${count})` : ''}
      </BottomBarLink>
    );
  }
}

BottomLink.defaultProps = {
  isActive: false,
  count: null,
};

BottomLink.propTypes = {
  isActive: PropTypes.bool,
  to: PropTypes.string.isRequired,
  isExternal: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  count: PropTypes.string,
};

export default BottomLink;
