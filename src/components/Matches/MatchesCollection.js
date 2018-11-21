import React from 'react';
import PropTypes from '../../PropTypes';
import SlickCarousal from '../SlickCarousal';
import CarousalNav from '../Common/CarousalNav';

class MatchesCollection extends React.PureComponent {
  state = {};
  slideRef = null;

  render() {
    switch (this.props.renderType) {
      case 'carousal': {
        const settings = {
          speed: 300,
          slidesToShow: 744 / 170,
          slidesToScroll: 4,
          infinite: false,
          easing: false,
          nextArrow: <CarousalNav direction="right" arrowName="nav" arrowType="image" />,
          prevArrow: <CarousalNav direction="left" arrowName="nav" arrowType="image" />,
          afterChange: slideMoved => {
            const style = window.getComputedStyle(this.slideRef.getElementsByClassName('slick-track')[0]);
            const perClickSlide = 4 * 170;
            const visibleSlide = 744;
            const allowedTranslate = -(parseInt(style.width, 0) - visibleSlide);
            const currentPos = parseInt(style.transform.split(',')[4], 10);
            const abountToSlide = currentPos - perClickSlide;
            if (currentPos > allowedTranslate && abountToSlide < allowedTranslate) {
              const slideToMove = -(allowedTranslate - currentPos) / 170;
              this.setState({ slideToMove });
            } else {
              this.setState({ slideToMove: 4 });
            }
          },
        };
        return (
          <div
            style={{ marginBottom: '30px' }}
            ref={node => {
              this.slideRef = node;
            }}
          >
            <SlickCarousal settings={settings}>{this.props.children}</SlickCarousal>
          </div>
        );
      }
      default:
        return this.props.children;
    }
  }
}

MatchesCollection.defaultProps = {
  renderType: 'default',
};
MatchesCollection.propTypes = {
  renderType: PropTypes.oneOf('default', 'carousal'),
  children: PropTypes.node.isRequired,
};
export default MatchesCollection;
