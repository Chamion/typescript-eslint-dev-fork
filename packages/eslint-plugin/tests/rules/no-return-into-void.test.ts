import rule from '../../src/rules/no-return-into-void';
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
    {
      code: `
const takesVoidCallback = (cb: () => void) => cb;
takesVoidCallback(() => {});
      `,
      options: [{ targets: ['lambda', 'identifier'] }],
    },
    {
      code: `
const takesVoidCallback = (_fst: unknown, cb: () => void) => cb;
takesVoidCallback(
  () => '',
  () => {},
);
      `,
      options: [{ targets: ['lambda', 'identifier'] }],
    },
    {
      code: `
const takesVoidCallback = (cb: () => void) => cb;
takesVoidCallback(() => '');
      `,
      options: [{ targets: ['identifier'] }],
    },
    {
      code: `
const takesVoidCallback = (cb: () => void) => cb;
const returnsString = () => '';
takesVoidCallback(returnsString);
      `,
      options: [{ targets: ['lambda'] }],
    },
    {
      code: `
type TakesVoidCallback =
  | ((a: () => void, b: () => void) => void)
  | ((a: unknown) => void);
const takesVoidCallback: TakesVoidCallback = (cb) => cb;
takesVoidCallback(() => '');
      `,
      options: [{ targets: ['lambda', 'identifier'] }],
    },
    {
      code: `
const takesVoidCallback = (cb: (() => void) | (() => number)) => cb;
takesVoidCallback(() => '');
      `,
      options: [{ targets: ['lambda', 'identifier'] }],
    },
  ],
  invalid: [
    {
      code: `
const takesVoidCallback = (cb: () => void) => cb;
takesVoidCallback(() => '');
      `,
      options: [{ targets: ['lambda'] }],
      errors: [{ messageId: 'will-be-voided' }],
    },
    {
      code: `
const takesVoidCallback = (_fst: unknown, cb: () => void) => cb;
takesVoidCallback(
  () => '',
  () => '',
);
      `,
      options: [{ targets: ['lambda'] }],
      errors: [{ messageId: 'will-be-voided' }],
    },
    {
      code: `
const takesVoidCallback = (cb: () => void) => cb;
const returnsString = () => '';
takesVoidCallback(returnsString);
      `,
      options: [{ targets: ['identifier'] }],
      errors: [{ messageId: 'will-be-voided' }],
    },
    {
      code: `
const takesVoidCallback = (_fst: unknown, cb: () => void) => cb;
const returnsString = () => '';
takesVoidCallback(returnsString, returnsString);
      `,
      options: [{ targets: ['identifier'] }],
      errors: [{ messageId: 'will-be-voided' }],
    },
    {
      code: `
[].forEach(() => '');
      `,
      options: [{ targets: ['lambda'] }],
      errors: [{ messageId: 'will-be-voided' }],
    },
  ],
});
