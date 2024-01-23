export class ValidationErrorException extends Error {
    private readonly _errors: object;
    private readonly _request: object;
    constructor(message: string, errors: object, request: object) {
        super(message);
        this.name = 'ValidationErrorException';
        this.message = message;
        this._errors = errors;
        this._request = request;
    }

    getErrors(): object {
        return this._errors;
    }

    getRequest(): object {
        return this._request;
    }
}