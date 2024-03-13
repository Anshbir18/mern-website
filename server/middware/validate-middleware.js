//? await schema.parseAsync(req.body) is the line where you use Zod to validate the request body data against the defined schema.

const validate = (schema) => async (req, res, next) => {
    try {
        const parsedBody = await schema.parseAsync(req.body);
        req.body = parsedBody;
        next();
    } catch (err) {
        const message=err.errors[0].message;
        res.status(400).json({ msg: message }); // Access error message using error.message
    }
};

export default validate;

