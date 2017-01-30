'use strict';

export interface IIteratorResult<T> {
  value: T;
  done: boolean;
}

export interface IIterator<T> {
  [Symbol.iterator]();
}

export abstract class Iterator<T> {
  [Symbol.iterator]() {
    return this;
  }

  abstract next(): IIteratorResult<T>;
}