const Joi = require('joi');
const validate = (schema) => (req, res, next) => {
    const {error} = schema.validate(req.body);
    if (error) {
        return res.status(400).json({error: error.details[0].message});
    }
    next();
};

const validationSchema = {
    register: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    }),
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    }),
    createBook: Joi.object({
        title: Joi.string().required(),
        year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
        authorId: Joi.string().optional(),
    }),
    updateBook: Joi.object({
        title: Joi.string().optional(),
        year: Joi.number().integer().min(1900).max(new Date().getFullYear()).optional(),
        authorId: Joi.string().optional(),
    }),
    createAuthor: Joi.object({
        name: Joi.string().required(),
    }),
    updateAuthor: Joi.object({
        name: Joi.string().optional(),
    }),
};

module.exports = {
    validateRegister: validate(validationSchema.register),
    validateLogin: validate(validationSchema.login),
    validateCreateBook: validate(validationSchema.createBook),
    validateUpdateBook: validate(validationSchema.updateBook),
    validateCreateAuthor: validate(validationSchema.createAuthor),
    validateUpdateAuthor: validate(validationSchema.updateAuthor),
};