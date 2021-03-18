import express from "express";
import createError from "http-errors";
import { getMaxListeners } from "node:process";
import userInfo from "../../../Common/users.json";
import {AuthSchema} from "../config/Validation/authQuote";

export default {
    generateHistory: async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            let elements = [];
            var parsed = "";
            console.log("Entered.");

            const { username } = req.body;

            // userInfoString = localStorage.getItem("userInfoString");
            // let userInfo = JSON.parse(userInfoString);
            console.log("I'm In.");
            if(userInfo.users.hasOwnProperty(username)) {
                for(let i=0; i< userInfo.users[username].history.length; i++) {
                    elements.push(userInfo.users[username].history[i]);
                    console.log("pushed.");
                    parsed += "<h3>Quote #" + (i+1) + "</h3>";
                    console.log("New entry");
                    for(let object in userInfo.users[username].history[i]) {
                        console.log("pushing.");
                        parsed += "<b>" + object + ":</b> " + userInfo.users[username].history[i][object] + "<br>";
                    }
                    console.log(parsed);
                
            }
        }

        res.json({success: parsed});

            

        } catch (error) {
            if(error.isJoi === true) {
                console.log(typeof(req.body.deliveryDate));
                return next(new createError.BadRequest("Invalid input! " + typeof(req.body.galsRequested) + " " + typeof(req.body.deliveryDate)));
            }
            next(error);
        }
    }
}