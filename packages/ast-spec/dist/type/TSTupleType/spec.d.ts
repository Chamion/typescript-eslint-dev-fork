import type { AST_NODE_TYPES } from '../../ast-node-types';
import type { BaseNode } from '../../base/BaseNode';
import type { TypeNode } from '../../unions/TypeNode';
export interface TSTupleType extends BaseNode {
    type: AST_NODE_TYPES.TSTupleType;
    elementTypes: TypeNode[];
}
//# sourceMappingURL=spec.d.ts.map