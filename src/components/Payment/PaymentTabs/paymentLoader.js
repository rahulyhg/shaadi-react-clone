import React from 'react';
import s from './styles';
import SvgLoader from '../../Common/SvgLoader';
import PropTypes from '../../../PropTypes';

const paymentLoader = ({ height }) => (
  <s.PlanContainer>
    <s.LoaderContainer height={height}>
      <SvgLoader isVisible isBigLoader />
    </s.LoaderContainer>
  </s.PlanContainer>
);

paymentLoader.propTypes = {
  height: PropTypes.string.isRequired,
};
export default paymentLoader;
