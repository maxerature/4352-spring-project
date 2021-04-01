import express from "express";
import createError from "http-errors";
import { AuthSchema } from "../config/Validation/auth";
import MySQL from "../MySQL/database";

let users: any = {};
MySQL.query("SELECT * FROM users", function (err, result, fields) {
  if (err) throw err;
  users = result;
});

let userInfo: any = {};

export default {
  login: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await AuthSchema.validateAsync(req.body);
      const { username, password } = req.body;
      for (let i of Object.keys(users)) {
        userInfo[users[i].username] = {};
        userInfo[users[i].username]["password"] = users[i].password;
        userInfo[users[i].username]["fullname"] = users[i].fullname;
      }
      // If username exists in db
      if (username in userInfo) {
        console.log("match");
        // If password matches in db
        if (userInfo[username].password == password) {
          // If user already created profile
          if (userInfo[username].fullname != "") {
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
