import express from "express";
import createError from "http-errors";
import userInfo from "../../../Common/users.json";
import {AuthSchema} from "../config/Validation/authQuote";

export default {
    populate: async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            await AuthSchema.validateAsync(req.body); 
            const {uname, name, add1, add2, city, state, zipcode} = req.body; 
            if(uname in userInfo.users) {
                userInfo.users[uname].address1 = add1; 
                userInfo.users[uname].address2 = add2; 
                userInfo.users[uname].city = city;
                userInfo.users[uname].state = state; 
                userInfo.users[uname].zipcode = zipcode;
                res.json("success");
            }
        } catch (error) {
            if(error.isJoi === true) {
                return next(new createError.BadRequest("Error."));
                next(error);
            }
        }
    }
}