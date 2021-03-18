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

            const { username } = req.body;

            if(userInfo.users.hasOwnProperty(username)) {
                for(let i=0; i< userInfo.users[username].history.length; i++) {
                    elements.push(userInfo.users[username].history[i]);
                    parsed += "<h3>Quote #" + (i+1) + "</h3>";
                    for(let object in userInfo.users[username].history[i]) {
                        parsed += "<b>" + object + ":</b> " + userInfo.users[username].history[i][object] + "<br>";
                    }
                
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