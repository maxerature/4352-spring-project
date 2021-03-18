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
            //If user exists
            const { username } = req.body;
            if(username in userInfo.users) {
                console.log("Username Found: " + username);
                let addr1Var = userInfo.users[username].address1;
                let addr2Var = userInfo.users[username].address2;
                let cityVar = userInfo.users[username].city;
                let stateVar = userInfo.users[username].state;
                let zipcodeVar = userInfo.users[username].zipcode;
                console.log("address1: " + addr1Var);
                console.log("city: " + cityVar);
                console.log("stateVar: " + stateVar);

                res.json({ addr1: addr1Var, addr2: addr2Var, city: cityVar, state: stateVar, zipCode: zipcodeVar});
            }
            else {
                console.log("Failure");
                res.json({ failure: "You are not logged in."});
            }
        } catch (error) {
            if(error.isJoi === true) {
                return next(new createError.BadRequest("Error."));
                next(error);
            }
        }
    }
}
