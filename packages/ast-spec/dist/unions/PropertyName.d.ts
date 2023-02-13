import type { Identifier } from '../expression/Identifier/spec';
import type { NumberLiteral } from '../expression/literal/NumberLiteral/spec';
import type { StringLiteral } from '../expression/literal/StringLiteral/spec';
import type { PrivateIdentifier } from '../special/PrivateIdentifier/spec';
import type { Expression } from '../unions/Expression';
export declare type PropertyName = ClassPropertyNameNonComputed | PropertyNameComputed | PropertyNameNonComputed;
export declare type PropertyNameComputed = Expression;
export declare type PropertyNameNonComputed = Identifier | NumberLiteral | StringLiteral;
export declare type ClassPropertyNameNonComputed = PrivateIdentifier | PropertyNameNonComputed;
//# sourceMappingURL=PropertyName.d.ts.map