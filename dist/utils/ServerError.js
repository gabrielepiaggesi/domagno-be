"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
class ServerError extends Error {
    constructor(code, msg = null, status = 500, e = undefined) {
        super(msg);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.status = status;
        this.message = msg;
        this.code = code;
        this.error = e;
    }
}
exports.ServerError = ServerError;
//# sourceMappingURL=ServerError.js.map