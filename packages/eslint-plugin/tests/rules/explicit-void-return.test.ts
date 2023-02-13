import rule from '../../src/rules/explicit-void-return';
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

ruleTester.run('explicit-void-return', rule, {
  valid: [
    `
const returnsVoid = () => {};
const fn = function () {
  return void returnsVoid();
};
    `,
    `
const returnsVoid = () => {};
const fn = () => {
  return void returnsVoid();
};
    `,
    `
const returnsVoid = () => {};
function fn() {
  return void returnsVoid();
}
    `,
    `
const fn = function () {
  return;
};
    `,
    `
const fn = () => {
  return;
};
    `,
    `
function fn() {
  return;
}
    `,
    `
const fn = function () {
  return undefined;
};
    `,
    `
const fn = () => {
  return undefined;
};
    `,
    `
function fn() {
  return undefined;
}
    `,
    `
const fn = function (arg) {
  if (arg) return '';
  else return undefined;
};
    `,
    `
const fn = arg => {
  if (arg) return '';
  else return undefined;
};
    `,
    `
function fn(arg) {
  if (arg) return '';
  else return undefined;
}
    `,
    `
const returnsVoid = () => {};
const fn = () => void returnsVoid();
    `,
    `
const fn = () => undefined;
    `,
    `
const fn = function (): void {
  return '';
};
    `,
    `
const fn = (): void => {
  return '';
};
    `,
    `
function fn(): void {
  return '';
}
    `,
    `
const fn = (): void => '';
    `,
  ],
  invalid: [
    {
      code: `
const returnsVoid = () => {};
const fn = function () {
  return returnsVoid();
};
      `.trim(),
      errors: [
        {
          messageId: 'body-return',
          suggestions: [
            {
              messageId: 'suggestion-void',
              output: `
const returnsVoid = () => {};
const fn = function () {
  return void returnsVoid();
};
              `.trim(),
            },
          ],
        },
      ],
    },
    {
      code: `
const returnsVoid = () => {};
const fn = () => {
  return returnsVoid();
};
      `.trim(),
      errors: [
        {
          messageId: 'body-return',
          suggestions: [
            {
              messageId: 'suggestion-void',
              output: `
const returnsVoid = () => {};
const fn = () => {
  return void returnsVoid();
};
              `.trim(),
            },
          ],
        },
      ],
    },
    {
      code: `
const returnsVoid = () => {};
function fn() {
  return returnsVoid();
}
      `.trim(),
      errors: [
        {
          messageId: 'body-return',
          suggestions: [
            {
              messageId: 'suggestion-void',
              output: `
const returnsVoid = () => {};
function fn() {
  return void returnsVoid();
}
              `.trim(),
            },
          ],
        },
      ],
    },
    {
      code: `
const returnsVoid = () => {};
const fn = () => returnsVoid();
      `.trim(),
      errors: [
        {
          messageId: 'arrow-body',
          suggestions: [
            {
              messageId: 'suggestion-void',
              output: `
const returnsVoid = () => {};
const fn = () => void returnsVoid();
              `.trim(),
            },
          ],
        },
      ],
    },
  ],
});
