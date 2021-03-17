import express from "express";
import createError from "http-errors";
import userInfo from "../../../Common/users.json";
import { AuthSchema } from "../config/Validation/auth";

export default {
  login: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await AuthSchema.validateAsync(req.body);
      const { username, password } = req.body;

      // If username exists in db
      if (username in userInfo.users) {
        // If password matches in db
        if (userInfo.users[username].password == password) {
          // If user already created profile
          if (userInfo.users[username].fullname != "") {
            res.json({ success: "quote.html" });
          } else {
            res.json({ success: "ProfileManage.html" });
          }
        } else {
          // error
          res.json({
            error:
              "Error: Login failed\nUsername does not exist, or password was typed incorrectly.",
          });
        }
      } else {
        // error
        res.json({
          error:
            "Error: Login failed\nUsername does not exist, or password was typed incorrectly.",
        });
      }
    } catch (error) {
      if (error.isJoi === true)
        return next(new createError.BadRequest("Invalid Username/Password"));
      next(error);
    }
  },
};
