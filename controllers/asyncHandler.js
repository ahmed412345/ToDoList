export default fn => {
    return async (request, response, next) => {
        try {
            await fn(request, response, next);
        } catch (e) {
            next(e);
        }
    };
};

