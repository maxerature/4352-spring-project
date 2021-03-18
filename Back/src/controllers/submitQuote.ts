import express from "express";
import createError from "http-errors";
import userInfo from "../../../Common/users.json";
import {AuthSchema} from "../config/Validation/authQuoteSubmit";

export default {
    submitQuote: async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            await AuthSchema.validateAsync(req.body);
            const { username, deliveryDate, galsRequested, pricePerGal, cost } = req.body;
            //If user exists
            if(username in userInfo.users) {
                console.log("Username Found: " + username);
                if(galsRequested<0) {
                    res.json({ error: "Gallons must be >0!"});
                } else {
                    var Str_text='{"requested":`$galsRequested`,"delivery_address1":`$userInfo.users[username].address1`,"delivery_address2":`$userInfo.users[username].address2`,"city":`$userInfo.users[username].city`,"state":`$userInfo.users[username].state`,"zipcode":`$userInfo.users[username].zipcode`,"delivery_date":`$deliveryDate`,"suggested_ppg":`$pricePerGal`,"total":`$cost`';
                    let length = userInfo.users[username].history.length;
                    //console.log(userInfo.users[username].history.push({"requested":galsRequested, "delivery_address1":addr1Var,"delivery_address2":addr2Var, "city": cityVar, "state": stateVar, "zipcode": zipcodeVar, "delivery_date":date,"suggested_ppg":pricePerGal,"total":cost}));
                    console.log(userInfo.users[username].history.push(JSON.parse(Str_text)));
                    console.log(userInfo)

                    let userInfoString = JSON.stringify(userInfo);
                    console.log(userInfoString);
                    localStorage.setItem("userInfoString", userInfoString);

                    res.json({success: "history.html"});
                }
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