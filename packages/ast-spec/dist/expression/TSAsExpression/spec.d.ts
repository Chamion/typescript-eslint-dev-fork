import type { AST_NODE_TYPES } from '../../ast-node-types';
import type { BaseNode } from '../../base/BaseNode';
import type { Expression } from '../../unions/Expression';
import type { TypeNode } from '../../unions/TypeNode';
export interface TSAsExpression extends BaseNode {
    type: AST_NODE_TYPES.TSAsExpression;
    expression: Expression;
    typeAnnotation: TypeNode;
}
//# sourceMappingURL=spec.d.ts.map