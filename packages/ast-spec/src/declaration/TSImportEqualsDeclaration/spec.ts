import type { AST_NODE_TYPES } from '../../ast-node-types';
import type { BaseNode } from '../../base/BaseNode';
import type { Identifier } from '../../expression/Identifier/spec';
import type { TSExternalModuleReference } from '../../special/TSExternalModuleReference/spec';
import type { EntityName } from '../../unions/EntityName';
import type { ImportKind } from '../ExportAndImportKind';

export interface TSImportEqualsDeclaration extends BaseNode {
  type: AST_NODE_TYPES.TSImportEqualsDeclaration;
  id: Identifier;
  moduleReference: EntityName | TSExternalModuleReference;
  importKind: ImportKind;
  isExport: boolean;
}
