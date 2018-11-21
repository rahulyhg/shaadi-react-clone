import PropTypes from '../../../PropTypes';
import userPropTypes from './userPropTypes';

export default {
  dispatch: PropTypes.func.isRequired,
  doDomActions: PropTypes.func.isRequired,
  match: PropTypes.shape(PropTypes.match).isRequired,
  location: PropTypes.shape(PropTypes.location).isRequired,
  history: PropTypes.shape(PropTypes.history).isRequired,
  session: PropTypes.shape(PropTypes.reducerSession).isRequired,
  user: PropTypes.shape(userPropTypes).isRequired,
  config: PropTypes.shape({
    app: PropTypes.shape(PropTypes.configApp).isRequired,
  }).isRequired,
  isSuspendedUser: PropTypes.bool,
  isReturningUser: PropTypes.bool,
  children: PropTypes.func.isRequired,
  getRegExitIntentLayer: PropTypes.func.isRequired,
  isMobile: PropTypes.func.isRequired,
};
