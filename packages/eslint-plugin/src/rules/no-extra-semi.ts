import { getESLintCoreRule } from '../util/getESLintCoreRule';
import * as util from '../util';

const baseRule = getESLintCoreRule('no-extra-semi');

type Options = util.InferOptionsTypeFromRule<typeof baseRule>;
type MessageIds = util.InferMessageIdsTypeFromRule<typeof baseRule>;

export default util.createRule<Options, MessageIds>({
  name: 'no-extra-semi',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow unnecessary semicolons',
      recommended: 'error',
      extendsBaseRule: true,
    },
    fixable: 'code',
    hasSuggestions: baseRule.meta.hasSuggestions,
    schema: baseRule.meta.schema,
    messages: baseRule.meta.messages,
  },
  defaultOptions: [],
  create(context) {
    const rules = baseRule.create(context);

    return {
      ...rules,
      'TSAbstractMethodDefinition, TSAbstractPropertyDefinition'(
        node: never,
      ): void {
        if (rules.MethodDefinition) {
          // for ESLint <= v7
          rules.MethodDefinition(node);
        } else {
          // for ESLint v8
          rules['MethodDefinition, PropertyDefinition']?.(node);
        }
      },
    };
  },
});
