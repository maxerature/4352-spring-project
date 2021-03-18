import express from "express";
import createError from "http-errors";
import { AuthSchema } from "../config/Validation/auth";
import { AuthLogin } from "../functions/login";

export default {
  login: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await AuthSchema.validateAsync(req.body);
      const { username, password } = req.body;
      res.json(AuthLogin(username, password));
    } catch (error) {
      if (error.isJoi === true)
        return next(new createError.BadRequest("Invalid Username/Password"));
      next(error);
    }
  },
};
