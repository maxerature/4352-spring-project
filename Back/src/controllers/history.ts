import express from "express";
import createError from "http-errors";
import { getMaxListeners } from "node:process";
import userInfo from "../../../Common/users.json";
import {AuthSchema} from "../config/Validation/authQuoteLoad";

let userTS:any = userInfo;

export default {
    generateHistory: async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            await AuthSchema.validateAsync(req.body);
            let elements = [];
            var parsed = "";

            const { username } = req.body;

            if(userTS.users.hasOwnProperty(username)) {
                for(let i=0; i< userTS.users[username].history.length; i++) {
                    elements.push(userTS.users[username].history[i]);
                    parsed += "<h3>Quote #" + (i+1) + "</h3>";
                    for(let object in userTS.users[username].history[i]) {
                        parsed += "<b>" + object + ":</b> " + userTS.users[username].history[i][object] + "<br>";
                    }
                }
                res.json({success: parsed});
            } else {
                res.json({ failure: "You are not logged in."});
            }
            
        } catch (error) {
            if(error.isJoi === true) {
                return next(new createError.BadRequest("Error. Invalid Username!"));
            }
            next(error);
        }
    }
}