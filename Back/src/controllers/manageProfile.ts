import express from "express";
import createError from "http-errors";
import userInfo from "../../../Common/users.json";
import {AuthSchema} from "../config/Validation/authProfile";

export default {
    manageProfile: async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            try{
                await AuthSchema.validateAsync(req.body); 
                const {username, fullname, add1, add2, city, state, zipcode} = req.body;
            
                console.log(username, fullname); 
                if(username in userInfo.users) {
                    userInfo.users[username].fullname = fullname; 
                    userInfo.users[username].address1 = add1; 
                    userInfo.users[username].address2 = add2; 
                    userInfo.users[username].city = city;
                    userInfo.users[username].state = state; 
                    userInfo.users[username].zipcode = zipcode;
                    res.json({success: "profile input added"});
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