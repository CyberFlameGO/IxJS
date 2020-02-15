export class AbortError extends Error {
  constructor() {
    super('The operation has been aborted.');
    Object.setPrototypeOf(this, AbortError.prototype);
  }
}