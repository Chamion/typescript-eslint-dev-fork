import type { Range } from './Range';
import type { SourceLocation } from './SourceLocation';
export declare type OptionalRangeAndLoc<T> = Pick<T, Exclude<keyof T, 'loc' | 'range'>> & {
    range?: Range;
    loc?: SourceLocation;
};
//# sourceMappingURL=OptionalRangeAndLoc.d.ts.map