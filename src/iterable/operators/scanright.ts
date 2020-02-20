import { IterableX } from '../iterablex';
import { toArray } from '../toarray';
import { OperatorFunction } from '../../interfaces';

export class ScanRightIterable<T, R> extends IterableX<R> {
  private _source: Iterable<T>;
  private _fn: (acc: R, x: T, index: number) => R;
  private _seed?: T | R;
  private _hasSeed: boolean;

  constructor(source: Iterable<T>, fn: (acc: R, x: T, index: number) => R, seed: R[]) {
    super();
    this._source = source;
    this._fn = fn;
    this._hasSeed = seed.length === 1;
    this._seed = seed[0];
  }

  *[Symbol.iterator]() {
    let hasValue = false;
    let acc = this._seed;
    const source = toArray(this._source);
    for (let offset = source.length - 1; offset >= 0; offset--) {
      const item = source[offset];
      if (hasValue || (hasValue = this._hasSeed)) {
        acc = this._fn(<R>acc, item, offset);
        yield acc;
      } else {
        acc = item;
        hasValue = true;
      }
    }
  }
}

export function scanRight<T, R = T>(
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  seed?: never[]
): OperatorFunction<T, R>;
export function scanRight<T, R = T>(
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  seed?: R
): OperatorFunction<T, R>;
export function scanRight<T, R = T>(
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  ...seed: R[]
): OperatorFunction<T, R> {
  return function scanRightOperatorFunction(source: Iterable<T>): IterableX<R> {
    return new ScanRightIterable(source, accumulator, seed);
  };
}
