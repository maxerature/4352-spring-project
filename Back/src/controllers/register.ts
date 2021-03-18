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
      await AuthSchema.validateAsync( req.body); 
      const {uname, pword} = req.body; 
      if (uname in userInfo.users) {
        res.send("error: username already in-use")
      }
      userInfo.users[uname] =
         {
          "password": pword,
          "fullname": null,
          "address1": null,
          "address2": null,
          "city": null,
          "state": null,
          "zipcode": null, 
          "history": []
        }
      res.send("registered");
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },
};
