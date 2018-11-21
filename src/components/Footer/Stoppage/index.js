import React from 'react';
import s from './styles';

const Footer = props => (
  <s.Footer>
    <s.CopyrightWrap>
      <s.CopyLeft>
        © 1996-{new Date().getFullYear()} Shaadi.com - {"The World's"} No.1 Matchmaking Service™
      </s.CopyLeft>
      <s.CopyRight>
        Passionately created by &nbsp;
        <s.CopyrightLink isExternal to="http://people-group.com/" target="_blank" rel="noreferrer noopener nofollow">
          People Group <s.leftarraw />
        </s.CopyrightLink>
      </s.CopyRight>
    </s.CopyrightWrap>
  </s.Footer>
);

export default Footer;
