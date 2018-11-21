import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

export { default as createMount } from './createMount';
export { default as shallow } from './createShallow';
