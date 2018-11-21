const baseValue = {
  id: 0,
  display_order: 0,
  type: '',
  title: '',
  placeHolder: '',
  isRequired: false,
  choices: [],
};

const extractChoices = (hash, key, def) => (hash[key] && !['null', 'undefined'].includes(hash[key]) ? hash[key] : def || []);

export default (base = baseValue, question = {}) => {
  const { id, display_order, type, title, placeHolder, isRequired } = question;
  return {
    ...base,
    id,
    display_order: display_order || base.display_order,
    type: type || base.type,
    title: title || base.title,
    placeHolder: placeHolder || base.placeHolder,
    isRequired: isRequired || base.isRequired,
    choices: extractChoices(question, 'choices', {}),
  };
};
