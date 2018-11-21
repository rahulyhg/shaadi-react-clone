import PropTypes from 'prop-types';
import React from 'react';
import MopContext from './MopContext';

class Tab extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isHover: false };
  }
  onMouseOver = () => {
    this.setState({ isHover: true });
  };
  onMouseLeave = () => {
    this.setState({ isHover: false });
  };

  render() {
    const styleState = {
      isActive: this.props.isActive,
      isHover: this.state.isHover,
    };
    const style = this.props.getStyle(styleState);
    const { children } = this.props;
    const isRenderProp = React.Children.count(children) === 0;
    return (
      <MopContext.Consumer>
        {({ isActive }) => (
          <div
            role="button"
            tabIndex="0"
            onMouseOver={this.onMouseOver}
            onMouseLeave={this.onMouseLeave}
            onClick={this.props.onClick}
            style={style}
          >
            {isRenderProp ? children(styleState) : children}
          </div>
        )}
      </MopContext.Consumer>
    );
  }
}
Tab.defaultProps = {
  onClick: () => null,
  getStyle: () => null,
  isActive: false,
};
Tab.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.bool, PropTypes.func]).isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  getStyle: PropTypes.func,
};
export default Tab;
