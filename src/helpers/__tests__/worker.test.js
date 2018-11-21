/* eslint-disable prettier/prettier */
import { toFunctionExpression, toExportStatement, toGlobalStatement, prependShims, prependBuildDependencies, moduleToJsString, toWorkerModuleString } from '../worker';

const evaluateJs = eval; // eslint-disable-line
const stripWhitespace = str => str.replace(/\s+/gi, ' ');
const getShimmerExpression = name => `self.${name} = `;

const FUNC_EXPR_REGEX = /^\s*function\s*(\w+)?\(\)\s*{(.*)/i;
const EXPORT_FUNC_STMNT_REGEX = /^\s*export\s+function\s*(\w+)?\(\)\s*{(.*)/i;
const FUNC_CONTENT_REGEX = /return\s*\((.*)\)\.apply\(null, arguments\);/i;
const GLOBAL_FUNC_STMNT_REGEX = /^\s*self\.(\w+)\s*=\s*function\s*\1\s*\(\)\s*{(.*)/i;
const GLOBAL_POLYFILL_FUNC_STMNT_REGEX = /^\s*self\.(\w+)\s*=\s*typeof self.\1 === 'function'\s*\?\s*self.\1\s*:\s*function\s*\1?\(\)\s*{(.*)/i;

describe('worker.js', () => {
  describe('toFunctionExpression', () => {
    it('should return a valid function expression', () => {
      const testFn = () => {};
      const jsString = toFunctionExpression('testFn', testFn);

      expect(jsString.match(FUNC_EXPR_REGEX)).not.toBe(null);
    });

    it('should return a valid function expression with function name', () => {
      const testFn = () => {};
      const fnName = 'testFn';
      const jsString = toFunctionExpression(fnName, testFn, true);

      const matches = stripWhitespace(jsString).match(FUNC_EXPR_REGEX);

      expect(() => evaluateJs(jsString)).not.toThrowError();
      expect(matches).not.toBe(null);
      expect(matches[1]).toBe(fnName);
    });

    it('should contain execution of the passed function', () => {
      const testFn = () => 'hello_world';
      const fnName = 'testFn';
      const jsString = toFunctionExpression(fnName, testFn, true);

      const matches = stripWhitespace(jsString).match(FUNC_EXPR_REGEX);
      const functionContents = matches[2];

      expect(functionContents.match(FUNC_CONTENT_REGEX)).not.toBe(null);
    });

    it('should contain the passed function inside', () => {
      const testFn = () => 'hello_world';
      const fnName = 'testFn';
      const jsString = toFunctionExpression(fnName, testFn, true);

      const matches = stripWhitespace(jsString).match(FUNC_EXPR_REGEX);

      const functionContents = matches[2];

      const passedFunctionString = functionContents.match(FUNC_CONTENT_REGEX)[1];

      expect(passedFunctionString).toBe(testFn.toString());
      expect(functionContents).toContain('hello_world');
    });
  });

  describe('toExportStatement', () => {
    it('should return a valid exported function statement', () => {
      const testFn = () => {};
      const fnName = 'testFn';
      const jsString = toExportStatement(fnName, testFn);

      const matches = stripWhitespace(jsString).match(EXPORT_FUNC_STMNT_REGEX);

      expect(matches).not.toBe(null);
    });
  });

  describe('toGlobalStatement', () => {
    it('should return a valid global function statement non polyfilled', () => {
      const testFn = () => {};
      const fnName = 'testFn';
      const jsString = toGlobalStatement(fnName, testFn);

      const matches = jsString.match(GLOBAL_FUNC_STMNT_REGEX);

      expect(() => evaluateJs(jsString)).not.toThrowError();
      expect(matches).not.toBe(null);
    });

    it('should return a valid global function statement polyfilled', () => {
      const testFn = () => {};
      const fnName = 'testFn';
      const jsString = toGlobalStatement(fnName, testFn, true);

      const matches = jsString.match(GLOBAL_POLYFILL_FUNC_STMNT_REGEX);

      expect(() => evaluateJs(jsString)).not.toThrowError();
      expect(matches).not.toBe(null);
    });
  });

  describe('prependShims', () => {
    it('should prepend the polyfill string', () => {
      const jsString = prependShims({
        fetch: () => 'mock_fetch',
      })('export function gogo() {}');

      expect(jsString).toContain(getShimmerExpression('fetch'));
      expect(jsString).toContain('mock_fetch');
      expect(jsString).toContain('function gogo() {}');
    });
  });

  describe('prependBuildDependencies', () => {
    it('should prepend the polyfill string', () => {
      const jsString = prependBuildDependencies()('export function gogo() {}');

      expect(jsString).toContain('self._typeof = ');
      expect(jsString).toContain('function gogo() {}');
    });
  });

  describe('moduleToJsString', () => {
    it('should return module string defined as an export', () => {
      const options = {};
      const jsString =
        moduleToJsString(options)({ hello: () => 'world' });

      expect(jsString.match(EXPORT_FUNC_STMNT_REGEX)).not.toBe(null);
    });

    it('should return module string defined as a global function', () => {
      const options = { isGlobal: true, isPolyfilled: false };
      const jsString =
        moduleToJsString(options)({ hello: () => 'world' });

      expect(jsString.match(GLOBAL_FUNC_STMNT_REGEX)).not.toBe(null);
    });

    it('should return module string defined as a global polyfilled function', () => {
      const options = { isGlobal: true, isPolyfilled: true };
      const jsString =
        moduleToJsString(options)({ hello: () => 'world' });

      expect(jsString.match(GLOBAL_POLYFILL_FUNC_STMNT_REGEX)).not.toBe(null);
    });
  });

  describe('toWorkerModuleString', () => {
    it('should return module string defined as an export', () => {
      const jsString = toWorkerModuleString({
        hello: () => 'world'
      });

      expect(jsString).toContain('hello');
      expect(jsString).toContain('world');
    });

    it('should have polyfilled fetch and Promise', () => {
      const jsString = toWorkerModuleString({
        hello: () => 'world'
      });

      expect(jsString).toContain(getShimmerExpression('fetch'));
      expect(jsString).toContain(getShimmerExpression('Promise'));
    });
  });
});
