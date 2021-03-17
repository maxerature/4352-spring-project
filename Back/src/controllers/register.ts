import express from "express";
import createError from "http-errors";
import userInfo from "../../../Common/users.json";
import { AuthSchema } from "../config/Validation/auth";

export default {
  register: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      res.send("register");
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },
};
