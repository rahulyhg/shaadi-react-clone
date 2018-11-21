import React from 'react';
import PropTypes from 'prop-types';
import 'intersection-observer';
import Observer from 'react-intersection-observer';

/* eslint-disable react/sort-comp */
class LazyLoadImage extends React.PureComponent {
  state = { isImageLoaded: false };

  onImageInView = () => this.setState({ isImageLoaded: true });

  render() {
    const { placeholder, image, offset, src } = this.props;
    const { isImageLoaded } = this.state;
    return (
      <React.Fragment>
        {!isImageLoaded && placeholder}
        <Observer triggerOnce onChange={inView => inView && this.onImageInView()} rootMargin={`${offset}px`}>
          {isImageLoaded ? image({ src }) : null}
        </Observer>
      </React.Fragment>
    );
  }
}

LazyLoadImage.defaultProps = {
  offset: 200,
  placeholder: null,
};

LazyLoadImage.propTypes = {
  src: PropTypes.string.isRequired,
  offset: PropTypes.number,
  image: PropTypes.func.isRequired,
  placeholder: PropTypes.element,
};

export default LazyLoadImage;
