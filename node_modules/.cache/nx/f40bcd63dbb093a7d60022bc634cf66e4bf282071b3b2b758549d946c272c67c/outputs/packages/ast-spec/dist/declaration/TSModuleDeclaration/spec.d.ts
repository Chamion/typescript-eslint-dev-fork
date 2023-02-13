import type { AST_NODE_TYPES } from '../../ast-node-types';
import type { BaseNode } from '../../base/BaseNode';
import type { Identifier } from '../../expression/Identifier/spec';
import type { TSModuleBlock } from '../../special/TSModuleBlock/spec';
import type { Literal } from '../../unions/Literal';
import type { Modifier } from '../../unions/Modifier';
export interface TSModuleDeclaration extends BaseNode {
    type: AST_NODE_TYPES.TSModuleDeclaration;
    id: Identifier | Literal;
    body?: TSModuleBlock | TSModuleDeclaration;
    global?: boolean;
    declare?: boolean;
    modifiers?: Modifier[];
}
//# sourceMappingURL=spec.d.ts.map