import express from "express";
import createError from "http-errors";
import userInfo from "../../../Common/users.json";
import { AuthSchema } from "../config/Validation/auth";

let userlist:any = userInfo; 

export default {
  register: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await AuthSchema.validateAsync(req.body); 
      const {username, password} = req.body; 
      if (!(username in userlist.users)) {
        userlist.users[username] = {
          "password": password,
            "fullname": null,
            "address1": null,
            "address2": null,
            "city": null,
            "state": null,
            "zipcode": null, 
            "history": null
        }
        res.json({ success: "user registered" })

      }
      else{
        res.json({error: "username already in-use"})
      }
      
      
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },
};

