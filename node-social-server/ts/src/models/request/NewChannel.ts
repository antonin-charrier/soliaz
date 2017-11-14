import joi = require("joi");
import { Constraint } from "../../utils";

export class NewChannel {
    @Constraint(joi.string().required())
    name: string;
}
