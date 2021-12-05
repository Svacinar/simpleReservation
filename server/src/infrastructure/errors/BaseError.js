module.exports = class BaseError extends Error {
    constructor(name, httpCode, description) {
        super(description);
        this.name = name;
        this.httpCode = httpCode;
    }
}
