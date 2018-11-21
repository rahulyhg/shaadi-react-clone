import React from 'react';
import CountryCodeField from './CountryCodeField';
import MobileNumberField from './MobileNumberField';
import s from '../styles';

const MobileNumberFields = () => (
  <s.countryCodeMainWrap>
    <s.countryCode>
      <s.countryCodeContainer>
        <CountryCodeField />
      </s.countryCodeContainer>
      <MobileNumberField />
    </s.countryCode>
  </s.countryCodeMainWrap>
);

export default MobileNumberFields;
