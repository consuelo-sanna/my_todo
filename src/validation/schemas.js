import * as Joi from 'joi-browser';

export const loginSchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

export const valida = (obj, schema) => {
    try {
        const { error } = Joi.validate(obj, schema);
        return error == null;
    } catch (e) {
        console.log(e);
    }
    //console.log(risultato);
    return false;
};
