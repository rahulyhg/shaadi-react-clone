/* eslint react/require-default-props: 0 */
import React from 'react';
import { isNotPaymentPage } from '../../components/Common/CarouselPageUtils';

const LoadingDesktop = () =>
  isNotPaymentPage && (
    <div>
      <div style={{ height: '56px', background: '#ff5a60' }} />
      <div style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.3)', background: '#fff', height: '41px' }} />
    </div>
  );

export default LoadingDesktop;
