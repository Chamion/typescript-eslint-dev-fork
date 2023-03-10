import type { AST_NODE_TYPES } from '../../ast-node-types';
import type { BaseNode } from '../../base/BaseNode';
export interface TemplateElement extends BaseNode {
    type: AST_NODE_TYPES.TemplateElement;
    value: {
        raw: string;
        cooked: string;
    };
    tail: boolean;
}
//# sourceMappingURL=spec.d.ts.map