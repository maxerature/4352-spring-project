import express from "express";
import { stat } from "fs";
import createError from "http-errors";
import { STATES } from "mongoose";
import userInfo from "../../../Common/users.json";
import {AuthSchema} from "../config/Validation/authProfile";


let userlist:any = userInfo; 


export default {
    getStates: async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
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


                let query = `SELECT * FROM states`;
                console.log(query);


                con.connect((err) => {
                    if (err) throw err;
                    console.log("Connected!");
                    con.query(query, (err, result) => {
                        if (err) throw err;
                        res.json(result);
                    });
                });
            
        } catch (error) {
            if(error.isJoi === true) {
                return next(new createError.BadRequest("Error."));
                next(error);
            }
        }
    },

    getProfile: async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            try{
                const {username} = req.params;
                

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


                let query = `SELECT * FROM Users AS U JOIN Addresses AS A ON A.UserID = U.UserID  WHERE username = \"${username}\" AND active = 1`;
                console.log(query);


                con.connect((err) => {
                    if (err) throw err;
                    console.log("Connected!");
                    con.query(query, (err, result) => {
                        if (err) throw err;
                        console.log("Result: " + result[0].fullname);
                        if(result[0].address1 == null || result[0].address1 == '') {
                            res.json({None:""});
                        }
                        else {
                            let user = result[0];
                            let fullname:String = user.fullname; 
                            let add1 = user.address1;
                            let add2 = user.address2;
                            let state = user.state; 
                            let city = user.city;
                            let zipcode = user.zipcode;
                            let found_user = {"name": fullname, "add1": add1, "add2":add2, "city":city, "state": state, "zipcode":zipcode};
                            console.log(found_user);
                            res.json(found_user);
                                
                        }
                    });
                });
                
            }catch(err){
               
                console.log(err.message)
            }
        } catch (error) {
            if(error.isJoi === true) {
                return next(new createError.BadRequest("Error."));
                next(error);
            }
        }
    },

    manageProfile: async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            try{
                await AuthSchema.validateAsync(req.body); 
                const {username, fullname, add1, add2, city, state, zipcode} = req.body;

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


                let query = `UPDATE users SET fullname =  \"${fullname}\" WHERE username = \"${username}\";`;
                console.log(query);


                con.connect((err) => {
                    if (err) throw err;
                    console.log("Connected!");
                    con.query(query, (err, result) => {
                        if (err) throw err;
                        con.query(`SELECT * FROM users WHERE username = \"${username}\"`, (err:any, result:any, fields:any) => {
                            if (err) throw err; 
                            let userID = result[0].userID; 
                            con.query(`UPDATE addresses SET active = 0 WHERE userID = ${userID};`, (err:any, result:any, fields:any) => {
                                if (err) throw err; 
                                query = `INSERT INTO addresses(address1, address2, city, state, zipcode, userID, active) VALUES(\"${add1}\", \"${add2}\", \"${city}\", \"${state}\", ${zipcode}, ${userID},1);`; 
                                con.query(query, (err:any, result:any, fields:any) => {
                                    if (err) throw err; 
                                    res.json({success : "Profile Saved"})
                                }); 
                            }); 
                        });
                    
                    });
                }); 
                 
            }catch(err){
                res.json({error: "Error Occured"})
                console.log(err.message)
            }
        } catch (error) {
            if(error.isJoi === true) {
                return next(new createError.BadRequest("Error."));
                next(error);
            }
        }
    }
}
