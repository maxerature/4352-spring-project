import express from "express";
import createError from "http-errors";
import { AuthSchema } from "../config/Validation/auth";
import MySQL from "../MySQL/database";

let userInfo: any = {};
let users: any;

MySQL.query("SELECT * FROM users", function (err, result, fields) {
  if (err) throw err;
  users = result;
});

export default {
  login: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      for (let i of users) {
        userInfo[i.username] = {};
        userInfo[i.username]["password"] = i.password;
        userInfo[i.username]["fullname"] = i.fullname;
      }
      await AuthSchema.validateAsync(req.body);
      const { username, password } = req.body;
      // If username exists in db
      console.log("Input = ", username, "In DB = ", Object.keys(userInfo)[0]);
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
