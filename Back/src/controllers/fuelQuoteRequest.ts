import express from "express";
import createError from "http-errors";
import { getMaxListeners } from "node:process";
import userInfo from "../../../Common/users.json";
import {AuthSchema} from "../config/Validation/authQuote";

export default {
    calculate: async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            console.log("Entered.");
            
            await AuthSchema.validateAsync(req.body);
            const { deliveryDate, galsRequested, pricePerGal } = req.body;

            if(!Date.parse(deliveryDate))
                res.json({ error: "fuck you."});

            console.log(typeof(galsRequested));
            if(!isNaN(galsRequested)) {
                let cost = galsRequested * pricePerGal;
                cost = Math.floor(cost*10000)/10000;

                res.json({ cost: cost});
            } else {
                res.json({ error: "Invalid Input."});
            }
        } catch (error) {
            if(error.isJoi === true) {
                console.log(typeof(req.body.deliveryDate));
                return next(new createError.BadRequest("Invalid input! " + typeof(req.body.galsRequested) + " " + typeof(req.body.deliveryDate)));
            }
            next(error);
        }
    }
}