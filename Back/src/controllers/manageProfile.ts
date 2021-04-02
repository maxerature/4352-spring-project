import express from "express";
import { stat } from "fs";
import createError from "http-errors";
import userInfo from "../../../Common/users.json";
import {AuthSchema} from "../config/Validation/authProfile";


let userlist:any = userInfo; 


export default {
    getProfile: async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            try{
                const {id} = req.params;
                let username:string = id; 

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


                let query = `SELECT * FROM Users AS U JOIN Addresses AS A ON U.UserID == A.UserID  WHERE username = ${username}`;
                console.log(query);


                con.connect((err) => {
                    if (err) throw err;
                    console.log("Connected!");
                    con.query(query, (err, result) => {
                        if (err) throw err;
                        console.log("Result: " + result);
                        if(result.address1 == null || result.address1 == '') {
                            res.json({None:""});
                        }
                        else {
                            con.query(`SELECT * FROM Users AS U JOIN Addresses AS A ON U.UserID == A.UserID  WHERE username like ${username}`, (err:any, result:any, fields:any) => {
                                if (err) throw err;
                                let user = result;
                                if(user.fullname != "") {
                                    let fullname:String = user.fullname; 
                                    let add1 = user.address1;
                                    let add2 = user.address2;
                                    let city = user.city;
                                    let state = user.state; 
                                    let zipcode = user.zipcode;
                                    let found_user = {"name": fullname, "add1": add1, "add2":add2, "city":city, "state":state, "zipcode":zipcode};
                                    res.json(found_user);
                                }
                            });
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


                let query = `INSERT INTO Users(fullname) VALUES(${fullname}) WHERE username = ${username}`;
                console.log(query);


                con.connect((err) => {
                    if (err) throw err;
                    console.log("Connected!");
                    con.query(query, (err, result) => {
                        if (err) throw err;
                        con.query(`INSERT INTO users(address1, address2, city, state, zipcode) VALUES(${add1}, ${add2}, ${city}, ${state}, ${zipcode}) WHERE username like ${username}`, (err:any, result:any, fields:any) => {
                            if (err) throw err; 
                            res.json({success : "Profile Saved"})
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
