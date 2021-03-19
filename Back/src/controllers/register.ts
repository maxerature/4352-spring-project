import express from "express";
import createError from "http-errors";
import userInfo from "../../../Common/users.json";
import { AuthSchema } from "../config/Validation/auth";

let userTS:any = userInfo;

export default {
  register: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      console.log("server arrive")
      await AuthSchema.validateAsync(req.body); 
      const {username, password} = req.body; 
      if (username in userInfo.users) {
        res.send({error: "username already in-use"})
      }
      interface CustomType {
        [key: string]: any;
        key1: string;
      }
      try{
        userTS.userInfo.users[username] = {
          "password": password,
           "fullname": null,
           "address1": null,
           "address2": null,
           "city": null,
           "state": null,
           "zipcode": null, 
           "history": []
        }; 
        userInfo.users = userInfo.users; 
        console.log(userInfo.users);
      }catch(err){
        console.log(err.message);
      }
      
        res.json({ success: "user registered" })
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },
};

