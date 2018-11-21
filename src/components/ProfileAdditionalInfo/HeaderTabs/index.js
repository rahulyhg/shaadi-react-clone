import React from 'react';
import PropTypes from 'prop-types';
import styleA from './styles';
import styleB from './stylesB';

const mailLink = (
  userHandle,
  wwwBaseUrl,
  selfName,
) => `mailto:?subject=Please check this profile on Shaadi.com&body=Hi,%0A%0APlease check the below profile on Shaadi.com.%0A
${wwwBaseUrl}/profile?txtprofileid=${userHandle}%0A%0ARegards,%0A${selfName}`;

let printPopup = null;

const HeaderTabs = props => {
  const components = {
    A: styleA,
    B: styleB,
    C: styleB,
  };

  const s = components[props.profilePageBucket || 'A'];

  return (
    <s.HeaderTabs>
      <s.Left>
        <s.DetailTab>Detailed Profile</s.DetailTab>
        {props.links.map(link => (
          <s.TabLink
            key={link.key}
            onClick={() => {
              link.url.includes('horoscope') ? trackNOpen(link.url, props.daTracking, 'horoscope_view') : (window.location = link.url);
            }}
          >
            {link.label}
            {link.isFree && <s.isFreeIcon isVisible={link.isFree}>FREE</s.isFreeIcon>}
          </s.TabLink>
        ))}
      </s.Left>
      <s.Right>
        <s.HeaderIconLink
          onClick={() => trackNOpen(mailLink(props.userHandle, props.wwwBaseUrl, props.selfName), props.daTracking, 'share_profile')}
          isEmail
        />
        <s.HeaderIconBtn title="Print" onClick={() => onPrintClick(props.printUrl, props.daTracking)} isPrint />
      </s.Right>
    </s.HeaderTabs>
  );
};

const trackNOpen = (link, daTracking, event) => {
  daTracking && daTracking(event);
  window.location = link;
};

const onPrintClick = (printUrl, daTracking) => {
  if (daTracking) daTracking('print_profile');
  if (printPopup !== null && printPopup.closed) {
    printPopup = null;
  }

  if (printPopup === null) {
    const width = 760;
    const height = 400;
    const left = ((window.screen.availWidth || 900) - width) / 2;
    const top = ((window.screen.availHeight || 800) - height) / 2;
    printPopup = window.open(printUrl, 'printPopup', `height=${height},width=${width},scrollbars=yes,left=${left},top=${top}`);
  } else {
    printPopup.focus();
  }
};

HeaderTabs.defaultProps = {
  links: [],
  daTracking: null,
  profilePageBucket: 'A',
};

const linkPropTypes = {
  key: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  isFree: PropTypes.bool.isRequired,
};

HeaderTabs.propTypes = {
  userHandle: PropTypes.string.isRequired,
  selfName: PropTypes.string.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  printUrl: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.shape(linkPropTypes)).isRequired,
  daTracking: PropTypes.func,
  profilePageBucket: PropTypes.string,
};

export default HeaderTabs;
