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
                console.log(username)
                if(username in userlist.users && userlist.users[username].fullname != "") {
                    let fullname = userlist.users[username].fullname; 
                    let add1 = userlist.users[username].address1;
                    let add2 = userlist.users[username].address2;
                    let city = userlist.users[username].city;
                    let state = userlist.users[username].state; 
                    let zipcode = userlist.users[username].zipcode;
                    let user = {"name": fullname, "add1": add1, "add2":add2, "city":city, "state":state, "zipcode":zipcode};
                    res.json(user);
                }
                else{
                    res.json({None:""});
                }
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
                if(username in userlist.users) {
                    userlist.users[username].fullname = fullname; 
                    userlist.users[username].address1 = add1; 
                    userlist.users[username].address2 = add2; 
                    userlist.users[username].city = city;
                    userlist.users[username].state = state; 
                    userlist.users[username].zipcode = zipcode;
                    res.json({success: "profile input added"});
                }
                else{
                    res.json({error:"username doesnt exist"});
                }
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
