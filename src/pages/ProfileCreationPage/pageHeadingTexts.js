import getDomainName from '../../helpers/getDomainName';
import capitalize from '../../helpers/capitalize';

export default key =>
  ({
    1: `Welcome to ${capitalize(getDomainName().toLowerCase())}!`,
    2: 'Just a few more steps!',
    3: 'Perfect, we are almost done!',
    4: 'One last thing!',
    suspendedUser: 'Welcome back! One last thing...',
    returningUser: 'Your email has been verified! Let’s continue..',
  }[key]);
