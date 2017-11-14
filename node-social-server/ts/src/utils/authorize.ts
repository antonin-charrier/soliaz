import passport = require("passport");
import express = require("express");

export function authorize(): express.Handler {
    return passport.authenticate("bearer", { session: false });
}