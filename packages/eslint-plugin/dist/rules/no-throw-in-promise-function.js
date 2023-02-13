"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@typescript-eslint/types");
const tsutils_1 = require("tsutils");
const util_1 = require("../util");
exports.default = (0, util_1.createRule)({
    name: 'no-throw-in-promise-function',
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow throwing in a function that always returns a promise',
            recommended: false,
            extendsBaseRule: false,
            requiresTypeChecking: true,
        },
        hasSuggestions: false,
        messages: {
            throw: 'Unexpected throw statement in a function that returns promise. Did you mean to return a rejecting promise instead?',
        },
        schema: [],
    },
    defaultOptions: [],
    create: context => {
        const parserServices = (0, util_1.getParserServices)(context, true);
        const checker = parserServices.program.getTypeChecker();
        // Copy-pasted from no-unsafe-return
        const getParentFunctionNode = (node) => {
            let current = node.parent;
            while (current) {
                if (current.type === types_1.AST_NODE_TYPES.ArrowFunctionExpression ||
                    current.type === types_1.AST_NODE_TYPES.FunctionDeclaration ||
                    current.type === types_1.AST_NODE_TYPES.FunctionExpression) {
                    return current;
                }
                current = current.parent;
            }
            // this shouldn't happen in correct code, but someone may attempt to parse bad code
            // the parser won't error, so we shouldn't throw here
            /* istanbul ignore next */ return null;
        };
        const getReturnTypeUnionSubTypes = (type) => (0, tsutils_1.unionTypeParts)(type)
            .flatMap(subType => subType.getCallSignatures())
            .map(signature => signature.getReturnType())
            .flatMap(returnType => (0, tsutils_1.unionTypeParts)(returnType));
        return {
            ThrowStatement: node => {
                const parent = getParentFunctionNode(node);
                if (parent == null || parent.async)
                    return;
                const parentType = checker.getApparentType(checker.getTypeAtLocation(parserServices.esTreeNodeToTSNodeMap.get(parent)));
                const returnTypes = getReturnTypeUnionSubTypes(parentType);
                const returnsPromise = returnTypes.every(returnType => (0, tsutils_1.isThenableType)(checker, parserServices.esTreeNodeToTSNodeMap.get(parent), returnType));
                if (returnsPromise) {
                    context.report({
                        node,
                        messageId: 'throw',
                    });
                }
            },
        };
    },
});
//# sourceMappingURL=no-throw-in-promise-function.js.map