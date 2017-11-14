import joi = require("joi");
import { Constraint } from "../../utils";

export class NewUser {
    @Constraint(joi.string().required())
    username: string;
    
    @Constraint(joi.string().email().optional())
    email?: string;

    @Constraint(joi.string().optional())
    pictureUrl?: string;

    @Constraint(joi.string().required())
    password: string;
}
