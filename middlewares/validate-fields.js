import { validationResult } from "express-validator";

const validateFields = ( req, res, next ) => { // next es la llamada al final si pasa tdo bien

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
}


module.exports = {
    validateFields
}
