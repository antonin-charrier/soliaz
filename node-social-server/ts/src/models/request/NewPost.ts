import joi = require("joi");
import { Constraint } from "../../utils";

export class NewPost {
    userId: string;

    @Constraint(joi.string().required())
    message: string;
}
