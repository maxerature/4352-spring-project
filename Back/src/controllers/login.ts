import express from "express";
import createError from "http-errors";
import { AuthSchema } from "../config/Validation/auth";
import MySQL from "../config/Init/initTypeMySQL";

export default {
  login: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await AuthSchema.validateAsync(req.body);
      const { username, password } = req.body;

      console.log(`MD5(` + password + `);`)

      let currUser: any;
      MySQL.query(
        `SELECT fullname FROM users WHERE username = \"${username}\" AND users.password = MD5(\"${password}\");`,
        function (err, result, fields) {
          if (err) throw err;
          currUser = result;

          // Username/password do not exist
          if (currUser.length === 0)
            res.json({
              error:
                "Error: Login failed\nUsername does not exist, or password was typed incorrectly.",
            });
          // User exists but profile has not been set up yet
          else if (currUser[0].fullname == "")
            res.json({ success: "ProfileManage.html" });
          // User exists and profile has been set up
          else res.json({ success: "quote.html" });
        }
      );
    } catch (error) {
      if (error.isJoi === true)
        return next(new createError.BadRequest("Invalid Username/Password"));
      next(error);
    }
  },
};
