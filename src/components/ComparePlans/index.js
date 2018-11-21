import React from 'react';
import s from './styles';
import CompareTable from './CompareTable';

const ComparePlans = () => (
  //  const compareHeader = headerElement.map((node, index) => (node.key === 'row1' ? <TableHeader {...node} /> : <TableRows {...node} />));

  <s.CompareContainer>
    <s.CompareHeading>Compare Membership Plans</s.CompareHeading>
    <s.CompareWrapper>
      <s.FeatureWrapper>
        <CompareTable />
        <s.MembershipFaq>
          <s.MembershipFaqWrap>
            <s.MembershipLink isExternal to="https://help.shaadi.com/hc/en-us/sections/201193721-Membership-Payment" target="_blank">
              Membership FAQ
            </s.MembershipLink>
          </s.MembershipFaqWrap>
          <s.MembershipNote>
            <s.RedAstrick>*</s.RedAstrick> View upto 10 Contact Numbers in a day
          </s.MembershipNote>
        </s.MembershipFaq>
      </s.FeatureWrapper>
    </s.CompareWrapper>
  </s.CompareContainer>
);
export default ComparePlans;
