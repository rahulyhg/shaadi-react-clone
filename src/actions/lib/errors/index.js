import asObject from './asObject';

const asString = e => asObject(e.body);
const asType = e => asObject(e.type);

const clean = e => ({ error: asObject(e) });

const errros = {
  asString,
  asType,
  asObject,
  clean,
};

export default errros;
