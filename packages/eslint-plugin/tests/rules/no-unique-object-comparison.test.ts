import rule from '../../src/rules/no-unique-object-comparison';
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

ruleTester.run('no-return-into-void', rule, {
  valid: [
    `
a === b;
    `,
    `
a !== b;
    `,
    `
a === ([], null);
    `,
    `
a === (a = null);
    `,
    `
[] && [];
    `,
    `
const notArray = new Foo();
array.includes([]);
    `,
    `
const notArray = new Foo();
array.indexOf([]);
    `,
    `
const notArray = new Foo();
array.lastIndexOf([]);
    `,
    `
const notArray: { length: 0 } | any[] = [];
array.includes([]);
    `,
    `
const notArray: { length: 0 } | any[] = [];
array.indexOf([]);
    `,
    `
const notArray: { length: 0 } | any[] = [];
array.lastIndexOf([]);
    `,
  ],
  invalid: [
    {
      code: `
a === [];
      `,
      errors: [{ messageId: 'comparison' }],
    },
    {
      code: `
a === {};
      `,
      errors: [{ messageId: 'comparison' }],
    },
    {
      code: `
a === new Foo();
      `,
      errors: [{ messageId: 'comparison' }],
    },
    {
      code: `
a === function foo() {};
      `,
      errors: [{ messageId: 'comparison' }],
    },
    {
      code: `
a === (() => {});
      `,
      errors: [{ messageId: 'comparison' }],
    },
    {
      code: `
a === (null, []);
      `,
      errors: [{ messageId: 'comparison' }],
    },
    {
      code: `
a === (a = []);
      `,
      errors: [{ messageId: 'comparison' }],
    },
    {
      code: `
a === /a/;
      `,
      errors: [{ messageId: 'comparison' }],
    },
    {
      code: `
a !== [];
      `,
      errors: [{ messageId: 'comparison' }],
    },
    {
      code: `
Object.is([], []);
      `,
      errors: [{ messageId: 'comparison' }, { messageId: 'comparison' }],
    },
    {
      code: `
[].includes([]);
      `,
      errors: [{ messageId: 'comparison' }],
    },
    {
      code: `
[].indexOf([]);
      `,
      errors: [{ messageId: 'comparison' }],
    },
    {
      code: `
[].lastIndexOf([]);
      `,
      errors: [{ messageId: 'comparison' }],
    },
    {
      code: `
Array.prototype.includes.bind(array, []);
      `,
      errors: [{ messageId: 'comparison' }],
    },
    {
      code: `
Array.prototype.includes.call(array, []);
      `,
      errors: [{ messageId: 'comparison' }],
    },
    {
      code: `
Array.prototype.indexOf.bind(array, []);
      `,
      errors: [{ messageId: 'comparison' }],
    },
    {
      code: `
Array.prototype.indexOf.call(array, []);
      `,
      errors: [{ messageId: 'comparison' }],
    },
    {
      code: `
Array.prototype.lastIndexOf.bind(array, []);
      `,
      errors: [{ messageId: 'comparison' }],
    },
    {
      code: `
Array.prototype.lastIndexOf.call(array, []);
      `,
      errors: [{ messageId: 'comparison' }],
    },
    {
      code: `
const array: unknown[] = [];
array.includes([]);
      `,
      errors: [{ messageId: 'comparison' }],
    },
    {
      code: `
const array: unknown[] = [];
array.indexOf([]);
      `,
      errors: [{ messageId: 'comparison' }],
    },
    {
      code: `
const array: unknown[] = [];
array.lastIndexOf([]);
      `,
      errors: [{ messageId: 'comparison' }],
    },
    {
      code: `
const array: unknown[] & { length: 0 } = [];
array.includes([]);
      `,
      errors: [{ messageId: 'comparison' }],
    },
    {
      code: `
const array: unknown[] & { length: 0 } = [];
array.indexOf([]);
      `,
      errors: [{ messageId: 'comparison' }],
    },
    {
      code: `
const array: unknown[] & { length: 0 } = [];
array.lastIndexOf([]);
      `,
      errors: [{ messageId: 'comparison' }],
    },
  ],
});
