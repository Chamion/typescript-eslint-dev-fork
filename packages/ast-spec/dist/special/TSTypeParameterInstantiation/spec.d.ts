import type { AST_NODE_TYPES } from '../../ast-node-types';
import type { BaseNode } from '../../base/BaseNode';
import type { TypeNode } from '../../unions/TypeNode';
export interface TSTypeParameterInstantiation extends BaseNode {
    type: AST_NODE_TYPES.TSTypeParameterInstantiation;
    params: TypeNode[];
}
//# sourceMappingURL=spec.d.ts.map