import express from "express";
import { stat } from "fs";
import createError from "http-errors";
import userInfo from "../../../Common/users.json";
import {AuthSchema} from "../config/Validation/authProfile";

import MySQL from "../MySQL/database"

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
                MySQL.query(`SELECT * FROM Users AS U JOIN Addresses AS A ON U.UserID == A.UserID  WHERE username like ${username}`, (err, result, fields) => {
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
                    else{
                        res.json({None:""});
                    }
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
                MySQL.query(`INSERT INTO Users(fullname) VALUES(${fullname}) WHERE username like ${username}`, (err, result, fields) => {
                    if (err) throw err;
                    MySQL.query(`INSERT INTO users(address1, address2, city, state, zipcode) VALUES(${add1}, ${add2}, ${city}, ${state}, ${zipcode}) WHERE username like ${username}`, (err, result, fields) => {
                        if (err) throw err; 
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
    }
}
