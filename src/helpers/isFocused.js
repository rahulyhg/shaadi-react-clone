export default (name, { attributeName = 'name' } = {}) => document.activeElement && document.activeElement[attributeName] === name;
