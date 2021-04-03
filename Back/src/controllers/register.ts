import express from "express";
import createError from "http-errors";
import { AuthSchema } from "../config/Validation/auth";


export default {
  register: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      console.log("here"); 

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

      let query = `SELECT * FROM users WHERE username = \"${username}\";`;
      console.log(query);

      con.connect((err) => {
        if (err) throw err;
        console.log("Connected!");
        con.query(query, (err, result) => {
            if (err) console.log(err);
            if(result == null || result == '') {
                con.query(`INSERT INTO Users(username, password, fullname) VALUES(\"${username}\", MD5(\'${password}\'), "NAN")`, (err:any, result:any)=>{
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

