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

export const errorHandler = ({ id = '', code, error, message = '' }) => {
  const comErrorInfo = {
    code,
    requestId: error?.requestId,
    original: error,
    message:
      message ||
      `[组件${id}:${code}]${error?.message || error?.errMsg || code}`,
  };
  const compError = new WdCompError(comErrorInfo.message, comErrorInfo);
  console.error(`${comErrorInfo.code}:`, comErrorInfo);
  return { compError, comErrorInfo };
};
