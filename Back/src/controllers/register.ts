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

      var mysql = require('mysql2');

      console.log("past sql");
      var con = await mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "password",
          port: 3306,
          database: "softwareproject"
      });
      console.log("created connection");


      let query = `SELECT * FROM Users WHERE username = ${username}`;
      console.log(query);


      con.connect((err) => {
        if (err) throw err;
        console.log("Connected!");
        con.query(query, (err, result) => {
            if (err) throw err;
            console.log("Result: " + result);
            if(result == null || result == '') {
                con.query(`INSERT INTO Users(username, password) VALUES(${username}, ${password})`, (err:any, result:any)=>{
                  if (err) throw err; 
                  res.json({ success: "user registered" })
                }); 
            }
            else {
              res.json({error: "username already in-use"});
            }
          });
      });
      
      
      
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },
};

