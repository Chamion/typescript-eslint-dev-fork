import type { AST_NODE_TYPES } from '../../ast-node-types';
import type { BaseNode } from '../../base/BaseNode';
import type { Expression } from '../../unions/Expression';
export interface ArrayExpression extends BaseNode {
    type: AST_NODE_TYPES.ArrayExpression;
    elements: Expression[];
}
//# sourceMappingURL=spec.d.ts.map