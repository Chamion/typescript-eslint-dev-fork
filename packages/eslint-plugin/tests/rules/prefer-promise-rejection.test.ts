import rule from '../../src/rules/prefer-promise-rejection';
import { getFixturesRootDir, RuleTester } from '../RuleTester';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    tsconfigRootDir: getFixturesRootDir(),
    project: './tsconfig.json',
  },
  parser: '@typescript-eslint/parser',
});

ruleTester.run('prefer-promise-rejection', rule, {
  valid: [
    `
const returnsSync = () => {
  throw new Error('error');
  return 'value';
};
    `,
    `
const returnsPromiseOrSync = (): Promise<string> | string => {
  throw new Error('error');
  return identifier;
};
    `,
    `
const returnsPromiseOrSync = param => {
  if (param == null) return 'value';
  else if (!param) return Promise.resolve('value');
  else throw new Error('error');
};
    `,
    `
const returnsPromise = async () => {
  await Promise.resolve();
  throw new Error('error');
  return 'value';
};
    `,
    `
const returnsPromise = async function () {
  await Promise.resolve();
  throw new Error('error');
  return 'value';
};
    `,
    `
async function returnsPromise() {
  await Promise.resolve();
  throw new Error('error');
  return 'value';
}
    `,
    `
const returnsAny = (): any => {
  throw new Error('error');
  return identifier;
};
    `,
    `
const returnsUnknown = (): unknown => {
  throw new Error('error');
  return identifier;
};
    `,
    `
type Thenable = {
  then: (
    thenCb: (value: unknown) => Thenable,
    catchCb: (error: unknown) => Thenable,
  ) => Thenable;
};
const returnsThenable = (): Thenable => {
  throw new Error('error');
  const thenable = { then: () => thenable };
  return thenable;
};
    `,
  ],
  invalid: [
    {
      code: `
const returnsPromise = (): Promise<string> => {
  throw new Error('error');
  return identifier;
};
      `,
      errors: [{ messageId: 'throw' }],
    },
    {
      code: `
const returnsPromise = () => {
  throw new Error('error');
  return Promise.resolve('value');
};
      `,
      errors: [{ messageId: 'throw' }],
    },
    {
      code: `
const returnsPromise = function (): Promise<string> {
  throw new Error('error');
  return identifier;
};
      `,
      errors: [{ messageId: 'throw' }],
    },
    {
      code: `
const returnsPromise = function () {
  throw new Error('error');
  return Promise.resolve('value');
};
      `,
      errors: [{ messageId: 'throw' }],
    },
    {
      code: `
function returnsPromise(): Promise<string> {
  throw new Error('error');
  return identifier;
}
      `,
      errors: [{ messageId: 'throw' }],
    },
    {
      code: `
function returnsPromise() {
  throw new Error('error');
  return Promise.resolve('value');
}
      `,
      errors: [{ messageId: 'throw' }],
    },
    {
      code: `
const returnsPromise = () => {
  if (condition) {
    throw new Error('error');
  }
  return Promise.resolve('value');
};
      `,
      errors: [{ messageId: 'throw' }],
    },
    {
      code: `
const identifier = Promise.resolve('value');
const returnsPromise = () => {
  throw new Error('error');
  return identifier;
};
      `,
      errors: [{ messageId: 'throw' }],
    },
    {
      code: `
const returnsPromise = (): Promise<string> => {
  throw new Error('error');
  throw 'error';
  return identifier;
};
      `,
      errors: [{ messageId: 'throw' }, { messageId: 'throw' }],
    },
  ],
});
