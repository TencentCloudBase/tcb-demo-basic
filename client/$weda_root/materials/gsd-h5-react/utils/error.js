export class WdCompError extends Error {
  code;
  requestId;
  original;
  constructor(message, context) {
    super(message);
    this.name = 'CompError';
    this.code = context && context.code ? context.code : '';
    this.requestId = context && context.requestId ? context.requestId : '';
    this.original = context ? context.original : {};
  }
}
