/* eslint-disable camelcase */
const hiddenReasonMap = {
  profile_hidden_by_member: 'selfHidden',
  profile_hidden_by_system: 'systemHidden',
  profile_deactivated_by_member: 'selfDeleted',
  profile_deactivated_by_system: 'systemDeleted',
  deactivation_default_reason: 'defaultDeleted',
  default: null,
};
export default other => {
  const { hidden_reason = 'default' } = other || '';
  return hiddenReasonMap[hidden_reason];
};
