import { IterableX } from '../../iterable/iterablex';
import { iif as ifStatic } from '../../iterable/iif';

/** @nocollapse */
IterableX.iif = ifStatic;

export declare namespace iterable {
  let iif: typeof ifStatic;
}

declare module '../../iterable/iterablex' {
  // eslint-disable-next-line no-shadow
  namespace IterableX {
    export { ifStatic as iif };
  }
}
