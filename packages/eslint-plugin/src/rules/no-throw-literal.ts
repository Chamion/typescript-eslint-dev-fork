import * as ts from 'typescript';
import * as util from '../util';
import {
  TSESTree,
  AST_NODE_TYPES,
} from '@typescript-eslint/experimental-utils';

export default util.createRule({
  name: 'no-throw-literal',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow throwing literals as exceptions',
      recommended: false,
      extendsBaseRule: true,
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      object: 'Expected an error object to be thrown.',
      undef: 'Do not throw undefined.',
    },
  },
  defaultOptions: [],
  create(context) {
    const parserServices = util.getParserServices(context);
    const program = parserServices.program;
    const checker = program.getTypeChecker();

    function isErrorLike(type: ts.Type): boolean {
      if (type.isIntersection()) {
        return type.types.some(isErrorLike);
      }
      if (type.isUnion()) {
        return type.types.every(isErrorLike);
      }

      const symbol = type.getSymbol();
      if (!symbol) {
        return false;
      }

      if (symbol.getName() === 'Error') {
        const declarations = symbol.getDeclarations() ?? [];
        for (const declaration of declarations) {
          const sourceFile = declaration.getSourceFile();
          if (program.isSourceFileDefaultLibrary(sourceFile)) {
            return true;
          }
        }
      }

      if (symbol.flags & (ts.SymbolFlags.Class | ts.SymbolFlags.Interface)) {
        for (const baseType of checker.getBaseTypes(type as ts.InterfaceType)) {
          if (isErrorLike(baseType)) {
            return true;
          }
        }
      }

      return false;
    }

    function checkThrowArgument(node: TSESTree.Node): void {
      if (
        node.type === AST_NODE_TYPES.AwaitExpression ||
        node.type === AST_NODE_TYPES.YieldExpression
      ) {
        return;
      }

      const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
      const type = checker.getTypeAtLocation(tsNode);

      if (type.flags & ts.TypeFlags.Undefined) {
        context.report({ node, messageId: 'undef' });
        return;
      }

      if (
        util.isTypeAnyType(type) ||
        util.isTypeUnknownType(type) ||
        isErrorLike(type)
      ) {
        return;
      }

      context.report({ node, messageId: 'object' });
    }

    return {
      ThrowStatement(node): void {
        if (node.argument) {
          checkThrowArgument(node.argument);
        }
      },
    };
  },
});
