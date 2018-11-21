export default hostname => {
  const parts = hostname.split('.').length >= 2 ? hostname.split('.').slice(-2) : ['shaadi', 'com'];
  const community = parts[0]
    .toLowerCase()
    .replace('shaadi', '')
    .replace('-', '');
  const domainName = hostname
    .split('.')
    .splice(1, 3)
    .join('.');
  switch (community) {
    case 'hindu':
    case 'muslim':
    case 'christian':
    case 'buddhist':
    case 'jain':
    case 'sikh':
    case 'assamese':
    case 'bengali':
    case 'gujarati':
    case 'hindi':
    case 'kashmiri':
    case 'konkani':
    case 'manipuri':
    case 'marathi':
    case 'odia':
    case 'punjabi':
    case 'sindhi':
    case 'urdu':
    case 'marwari':
    case 'tulu':
    case 'parsi':
    case 'telugu':
    case 'kannada':
    case 'malayalee':
    case 'tamil':
    case 'nri':
      return {
        community,
        myDomain: `my.${parts.join('.')}`,
        domain: `www.${parts.join('.')}`,
        domainName,
        tagline: `The World's Leading ${community[0].toUpperCase()}${community.slice(1)} Matrimonial Site`,
        logo: `https://img2.shaadi.com/assests/2016/images/logos/${community}-logo-v1.png`,
        inverseLogo: `https://img2.shaadi.com/imgs/logos/payment/${community}.png`,
      };
    default:
      return {
        community,
        myDomain: `my.${parts.join('.')}`,
        domain: `www.${parts.join('.')}`,
        domainName,
        tagline: `Shaadi.com - World's No.1 Matrimonial & Matchmaking Service`,
        logo: `https://img2.shaadi.com/assests/2016/images/logos/shaadi-logo-v1.png`,
        inverseLogo: `https://img2.shaadi.com/imgs/logos/payment/payment-shaadi-logo.png`,
      };
  }
};
