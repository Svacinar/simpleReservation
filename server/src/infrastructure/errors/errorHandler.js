const errorHandler = () => {
    const handleError = (error, responseStream) => {
        console.error(error);
        if (responseStream) responseStream.sendStatus(error.httpCode || 500);
    }
    return {
        handleError,
    }
}

module.exports = errorHandler();