export default connect => (connect ? connect.can_cancel === 'Y' : false);
