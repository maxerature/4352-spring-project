import express from "express";
import createError from "http-errors";
import userInfo from "../../../Common/users.json";
import {AuthSchema} from "../config/Validation/authQuoteLoad";

let userTS:any = userInfo;

export default {
    populate: async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            //If user exists
            await AuthSchema.validateAsync(req.body);
            const { username } = req.body;
            if(username in userTS.users) {
                let addr1Var = userTS.users[username].address1;
                let addr2Var = userTS.users[username].address2;
                let cityVar = userTS.users[username].city;
                let stateVar = userTS.users[username].state;
                let zipcodeVar = userTS.users[username].zipcode;

                res.json({ addr1: addr1Var, addr2: addr2Var, city: cityVar, state: stateVar, zipCode: zipcodeVar});
            }
            else {
                res.json({ error: "You are in an incorrect account."});
            }
        } catch (error) {
            if(error.isJoi === true) {
                return next(new createError.BadRequest("Error. Invalid Username"));
            }
        }
    }
}
