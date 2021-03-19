import express from "express";
import createError from "http-errors";
import userInfo from "../../../Common/users.json";
import {AuthSchema} from "../config/Validation/authProfile";
let userlist:any = userInfo; 

let userTS:any = userInfo;

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
                if(username in userlist.users) {
                    if(userlist.users[username].fullname != ""){
                        res.json({error: "profile already set up"});
                    }
                    else{
                        userlist.users[username].fullname = fullname; 
                        userlist.users[username].address1 = add1; 
                        userlist.users[username].address2 = add2; 
                        userlist.users[username].city = city;
                        userlist.users[username].state = state; 
                        userlist.users[username].zipcode = zipcode;
                        res.json({success: "profile input added"});
                    }
                    
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