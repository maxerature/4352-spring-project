import express from "express";
import createError from "http-errors";
import userInfo from "../../../Common/users.json";
import { AuthSchema } from "../config/Validation/auth";
import MySQL from "../MySQL/database";

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
      MySQL.query(`SELECT * FROM Users WHERE username like ${username}`,(err, result, fields) =>{
        if (err) throw err;
        let exist = result; 
        if (exist == "") {
          let result = MySQL.query(`INSERT INTO Users(username, password) VALUES(${username}, ${password})`); 
          res.json({ success: "user registered" })
        }
        else{
          res.json({error: "username already in-use"})
        }
      });
      
      
      
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },
};
