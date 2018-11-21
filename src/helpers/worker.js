/** default: WorkerModule
 * Create a module of pure-input functions(all inputs explicitly passed as arguments) to run inside a Web Worker
 *
 * Points to remember:
 *  - To make network requests, you have to use fetch api
 *  - You can not use variables or modules defined outside the module.
 *  - If you want access to a function, you can define it inside the modules.
 *  - Polyfills available in the browser will not be available in the worker context so you need to manually add it using addPolyfill
 *
 * AutoPolyfills: fetch(unfetch), Promsie(promise-polyfill)
 * Usage:
 *     // Creates a WebWorker module
 *     const profile = WorkerModule({
 *       getProfile: user =>
 *         fetch('https://yourapi.com/user/${user.id}', toRequest(user))
 *           .then(r => r.json()),
 *       toRequest: user => ({
 *         method: 'get',
 *         body: JSON.stringify(user),
 *       }),
 *     });
 *
 *     // Use the api
 *     profile.getProfile(user).then(doStuff).catch(handleStuff)
 */
/* eslint-disable prettier/prettier */

import workerize from 'workerize';
import { compose } from 'redux';

import unfetch from './polyfills/worker-fetch';
import shimPromise from './polyfills/worker-promise';


// type ModuleString = String;
// type Module = Map<Function>;
// type ModuleOptions = { isGlobal :: Boolean, isPolyfilled :: Boolean };

// prependString :: string -> string -> string
const prependString = str1 => str2 => str1 + str2;

// toFunctionExpression :: (String, Function) -> ModuleString
export const toFunctionExpression = (fnName, fn, isNamed = false) => `function ${isNamed? fnName: ''}() {
  return (${fn.toString()}).apply(null, arguments);
}`;

// toExportStatement :: (String, Function) -> ModuleString
export const toExportStatement = (fnName, fn) => `export ${toFunctionExpression(fnName, fn, true)}`;

// toGlobalStatement :: (String, Function, Boolean) -> ModuleString
export const toGlobalStatement = (fnName, fn, isPolyfilled = false) => `
  self.${fnName} = ${
    isPolyfilled
      ? `typeof self.${fnName} === 'function' ? self.${fnName} : ${toFunctionExpression(fnName, fn, false)};`
      : toFunctionExpression(fnName, fn, true)
  };
`;

// moduleToJsString :: (Module, ModuleOptions) -> ModuleString
export const moduleToJsString = ({ isGlobal = false, isPolyfilled = false } = {}) => modulesMap =>
  Object.keys(modulesMap || {})
    .map(fnName =>
      isGlobal
        ? toGlobalStatement(fnName, modulesMap[fnName], isPolyfilled)
        : toExportStatement(fnName, modulesMap[fnName])
    )
    .join('\n');

// prependShims :: Module -> ModuleString
export const prependShims = compose(
  prependString,
  moduleToJsString({ isGlobal: true, isPolyfilled: false }),
);

// prependBuildDependencies :: () -> ModuleString -> ModuleString
export const prependBuildDependencies = () => prependString([
  'self._typeof = function(o) { return typeof o; };'
].join('\n'));

// toWorkerModuleString :: Module -> ModuleString
export const toWorkerModuleString = compose(
  prependShims({
    shimPromise,
    fetch: unfetch,
  }),
  prependString(';self.shimPromise();\n'),
  moduleToJsString(),
);

// createWorkerizeModule :: Module -> Worker
const createWorkerizeModule = compose(
  workerize,
  prependBuildDependencies(),
  toWorkerModuleString,
);

// WorkerModule :: Module -> Worker
export const WorkerModule = modules => {
  try {
    return createWorkerizeModule(modules);
  } catch(e) {
    return modules;
  }
};

// WorkerModule.singleton :: Module -> Boolean -> Worker
WorkerModule.singleton = modules => {
  let instance = null;
  return (invalidate = false) => {
    if(!instance || invalidate) instance = WorkerModule(modules);
    return instance;
  };
};

export default WorkerModule;
