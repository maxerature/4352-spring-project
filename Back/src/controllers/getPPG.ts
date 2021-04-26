import express from "express";
import createError from "http-errors";
import { getMaxListeners } from "node:process";
import userInfo from "../../../Common/users.json";
import {AuthSchema} from "../config/Validation/authQuote";

export default {
    getPPG: async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const { username, galsRequested } = req.body;

            var mysql = require('mysql2');

            var con = await mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "password",
                port: 3306,
                database: "softwareproject"
            });

            const baseCost = 1.50;
            const profitFactor = 0.1;
            let rateHistoryFactor;
            let gallonsRequestedFactor;
            let locationFactor;
            let finalPrice = 0.0;

            //Get gallons requested factor
            if(galsRequested > 1000) {
                gallonsRequestedFactor = 0.02;
            } else {
                gallonsRequestedFactor = 0.03;
            }


            // Get Location factor
            //Get State
            let query = `\
            SELECT State\n\
            FROM Addresses\n\
            INNER JOIN users\n\
                ON Addresses.userID = users.userID\n\
            WHERE users.username = \"${username}\"\n\
                AND active=1;`
            con.connect(function(err) {
                if(err) throw err;
                con.query(query, function(err, result) {
                    if(err) throw err;
                    console.log(result);
                    if(result[0].State == 'TX') {
                        locationFactor = 0.02;
                    } else {
                        locationFactor = 0.04;
                    }
                    console.log(locationFactor);

                    //Get Rate History Factor
                    let query = `\
                    SELECT COUNT(*)\n\
                    FROM History\n\
                    INNER JOIN users\n\
                        ON History.userID = users.userID\n\
                    WHERE users.username = \"${username}\";`

                    con.connect(function(err) {
                        if(err) throw err;
                        con.query(query, function(err, result) {
                            if(err) throw err;
                            if(result[0][`COUNT(*)`] == 0) {
                                rateHistoryFactor = 0.00;
                            } else {
                                rateHistoryFactor = 0.01;
                            }
                            console.log(gallonsRequestedFactor);

                            //Calculate Margin
                            finalPrice = baseCost * (locationFactor - rateHistoryFactor + gallonsRequestedFactor + profitFactor);
                            let margin = finalPrice;
                            //Add current price
                            finalPrice += baseCost;
                            res.json({ppg: finalPrice, margin: margin});
                        })
                    })
                    
                })
            })
            

            
            
            
        } catch (error) {
            if(error.isJoi === true) {
                console.log(typeof(req.body.deliveryDate));
                return next(new createError.BadRequest("Error. Invalid input!"));
            }
            next(error);
        }
    }
}