import React, { Fragment } from 'react';
import _ from 'lodash';
import PropTypes from '../../../PropTypes';
import s from './styles';

class Star extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localRating: props.rating,
    };
    this.reset = this.reset.bind(this);
    this.setRating = this.setRating.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ localRating: nextProps.rating });
  }

  setRating(i, type) {
    i >= this.props.rating ? this.setState({ localRating: i + 1 }) : this.setState({ localRating: this.props.rating });
  }

  reset() {
    this.setState({ localRating: this.props.rating });
  }

  render() {
    const { totalStars, updateRating } = this.props;
    const totalStarsNum = totalStars;
    const stars = _.fill(_.times(totalStarsNum, i => 0), 1, 0, this.state.localRating).map((value, index) => {
      const uniqueId = index;
      if (value === 1) {
        return this.props.layout === 'mobile' ? (
          <s.StarActive key={uniqueId} onClick={() => updateRating(index + 1)} onMouseOut={this.reset} val={value} />
        ) : (
          <s.StarActive
            key={uniqueId}
            onClick={() => updateRating(index + 1)}
            onMouseOver={() => this.setRating(index, 'hover')}
            onMouseOut={this.reset}
            val={value}
          />
        );
      }
      return this.props.layout === 'mobile' ? (
        <s.Star key={uniqueId} onClick={() => updateRating(index + 1)} onMouseOut={this.reset} val={value} />
      ) : (
        <s.Star
          key={uniqueId}
          onClick={() => updateRating(index + 1)}
          onMouseOver={() => this.setRating(index, 'hover')}
          onMouseOut={this.reset}
          val={value}
        />
      );
    });
    return <Fragment>{stars}</Fragment>;
  }
}

Star.defaultProps = {
  value: -1,
  totalStars: 5,
  layout: 'desktop',
};

Star.propTypes = {
  updateRating: PropTypes.func.isRequired,
  rating: PropTypes.number.isRequired,
  totalStars: PropTypes.number,
  layout: PropTypes.string,
};

export default Star;
