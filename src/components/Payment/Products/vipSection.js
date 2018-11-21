import React from 'react';
import s from './styles';

const vipSection = () => (
  <s.PlanWrapper>
    <s.SpacerFive />
    <s.PlanContainer>
      <s.VipShaadi>
        <s.VipLogo />
        <br />
        An exclusive boutique style matchmaking service for society{`'s`} elite.{' '}
        <s.GetInvited isExternal to={'https://www.vipshaadi.in/vipshaadi'} target="_blank">
          Get Invited
        </s.GetInvited>
      </s.VipShaadi>
    </s.PlanContainer>
  </s.PlanWrapper>
);
export default vipSection;
