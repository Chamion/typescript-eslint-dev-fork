import type { AST_NODE_TYPES } from '../../ast-node-types';
import type { BaseNode } from '../../base/BaseNode';
import type { Identifier } from '../../expression/Identifier/spec';
export interface ImportNamespaceSpecifier extends BaseNode {
    type: AST_NODE_TYPES.ImportNamespaceSpecifier;
    local: Identifier;
}
//# sourceMappingURL=spec.d.ts.map