"use strict";
require("reflect-metadata");
const _ = require("lodash");
const joi = require("joi");
exports.Key = "AnnotationMeta";
function Constraint(joi) {
    return function (target, propertyKey) {
        let meta = _.assign({}, Reflect.getMetadata(exports.Key, target.constructor));
        meta[propertyKey] = joi;
        Reflect.defineMetadata(exports.Key, meta, target.constructor);
    };
}
exports.Constraint = Constraint;
function validate(targetClass, instance) {
    let meta = Reflect.getMetadata(exports.Key, targetClass);
    if (!meta) {
        return {
            error: null,
            value: {}
        };
    }
    let schema = meta.__schema;
    if (!schema) {
        schema = joi.object().keys(meta);
        meta.__schema = schema;
        Reflect.defineMetadata(exports.Key, meta, targetClass);
    }
    return joi.validate(instance, schema);
}
exports.validate = validate;
function validateBody(bodyType) {
    return (req, res, next) => {
        let validation = validate(bodyType, req.body);
        if (validation.error) {
            res.status(400);
            return res.json(validation.error);
        }
        next();
    };
}
exports.validateBody = validateBody;
function validateQuery(queryType) {
    return (req, res, next) => {
        let validation = validate(queryType, req.query);
        if (validation.error) {
            res.status(400);
            return res.json(validation.error);
        }
        next();
    };
}
exports.validateQuery = validateQuery;
//# sourceMappingURL=Validation.js.map