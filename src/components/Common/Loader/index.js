import React from 'react';
import s from './styles';

const Loader = () => (
  <s.LoaderWrapper>
    <s.LoaderContainer>
      <s.OuterShadow />
      <s.InnerShadow />
      <s.DefaultLeft>
        <s.InnerFill />
      </s.DefaultLeft>
      <s.DefaultRight>
        <s.InnerFill />
      </s.DefaultRight>
    </s.LoaderContainer>
  </s.LoaderWrapper>
);

export default Loader;
