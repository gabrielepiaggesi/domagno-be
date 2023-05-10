export class ServerError extends Error {
    public message: string;
    public status: number;
    public code: string;
    public error: any;

    constructor(code: string, msg: string = null, status = 500, e = undefined) {
        super(msg)
        Error.captureStackTrace(this, this.constructor);
    
        this.name = this.constructor.name
        this.status = status;
        this.message = msg;
        this.code = code;
        this.error = e;
    }
}