import type { AST_NODE_TYPES } from '../../ast-node-types';
import type { BaseNode } from '../../base/BaseNode';
import type { TypeNode } from '../../unions/TypeNode';
export interface TSOptionalType extends BaseNode {
    type: AST_NODE_TYPES.TSOptionalType;
    typeAnnotation: TypeNode;
}
//# sourceMappingURL=spec.d.ts.map