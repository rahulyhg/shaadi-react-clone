/* global window */
import PropTypes from 'prop-types';
import React from 'react';
import { stringify } from 'qs';
import s from './styles';

const InlineLogin = props => {
  if (/discovery/i.test(props.path)) {
    const currUrl = window.location.href;
    window.location.href = `${props.wwwBaseUrl}/registration/user/login?${stringify({ go: currUrl })}`;
    return null;
  }

  return (
    <s.InlineLogin isChatOpen={false} windowWidth={window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth}>
      <s.Sidebar>
        <s.Sidenav>
          <s.SidenavTitle>Partner Search</s.SidenavTitle>
          <s.NavLink isExternal to={'/search?search_type=smart_search'}>
            - Smart Search
          </s.NavLink>
          <s.NavLink isExternal to={'/search'}>
            - Basic Search
            <s.NavLinkCaption>(City, Profession)</s.NavLinkCaption>
          </s.NavLink>
          <s.NavLink isExternal to={'/search?search_type=whoisonline'}>
            - Who is Online
          </s.NavLink>
          <s.NavLink isExternal to={'/search?search_type=astrology_search'}>
            - Astrology Search
          </s.NavLink>
          <s.NavLink isExternal to={'/search?search_type=specialcase_search'}>
            - Special Classes
          </s.NavLink>
          <s.NavLink isExternal to={'/search/partner/'}>
            - My Matches
          </s.NavLink>
          <s.NavLink isExternal to={'/search/personal/'}>
            - Reverse Matches
          </s.NavLink>
          <s.NavLink isExternal to={'/search/ematchmaker/'}>
            - 2-Way Matches
          </s.NavLink>
        </s.Sidenav>
        <s.Sidenav>
          <s.SidenavTitle>Quick Links</s.SidenavTitle>
          <s.NavLink isExternal to={'/registration/user/login'}>
            - Shortlistst & more
          </s.NavLink>
          <s.NavLink isExternal to={'/search/partner/'}>
            - My Matches
          </s.NavLink>
          <s.NavLink isExternal to={'/search/personal/'}>
            - Reverse Matches
          </s.NavLink>
          <s.NavLink isExternal to={'/search/ematchmaker/'}>
            - 2-Way Search
          </s.NavLink>
          <s.NavLink isExternal to={'/search/saved-search/list'}>
            - Saved Classes
          </s.NavLink>
          <s.NavLink isExternal to={'/customer-relations/faq/call'}>
            - My Help
          </s.NavLink>
        </s.Sidenav>
      </s.Sidebar>
      <s.Content>
        <s.Title>{props.title}</s.Title>
        <s.Message>{props.message}</s.Message>
        <s.SubHeading>To use this section, register or login</s.SubHeading>
        <s.Options>
          <s.Option>
            <s.Label>Existing member?&nbsp;</s.Label>
            <s.LoginLink isExternal to={`/registration/user/login?${stringify({ go: window.location.href })}`}>
              Login and start communicating now
            </s.LoginLink>
          </s.Option>
          <s.Option>
            <s.Label>Not a Shaadi.com member?</s.Label>
            <s.Details>
              <s.RegisterLink isExternal to={'/registration/user'}>
                Register Now
              </s.RegisterLink>
              <s.WhyJoinLink isExternal to={'/introduction/index/letter-from-cmd'}>
                Why join?
              </s.WhyJoinLink>
            </s.Details>
          </s.Option>
        </s.Options>
      </s.Content>
    </s.InlineLogin>
  );
};
InlineLogin.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
};

export default InlineLogin;
