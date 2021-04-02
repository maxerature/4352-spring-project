import express from "express";
import createError from "http-errors";
import userInfo from "../../../Common/users.json";
import {AuthSchema} from "../config/Validation/authQuoteSubmit";

const fs = require('fs');

let userTS:any = userInfo;

export default {
    submitQuote: async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            await AuthSchema.validateAsync(req.body);
            const { username, deliveryDate, galsRequested, pricePerGal, cost } = req.body;


            var mysql = require('mysql2');

            var con = await mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "password",
                port: 3306,
                database: "softwareproject"
            });

            //Check if user exists

            let query = "SELECT userID\n\
                FROM Users\n\
                WHERE username = \"" + username + "\";";


            con.connect(function(err) {
                if (err) throw err;
                con.query(query, function (err, result) {
                    if (err) throw err;
                    if(result == null || result == '') {
                        res.json({error: "You are in an incorrect account."});
                    }

                    else {
                        let userid = result[0].userID;
                        
                        if(!galsRequested || galsRequested<=0) {
                            res.json({ error: "Gallons must be >0!"});
                        } else {

                            query = "SELECT addressID\n\
                            FROM Addresses\n\
                            WHERE\n\
                                Addresses.active = true\n\
                                AND userID = " + userid + ";";
                                
                            con.connect(function(err) {
                                if (err) throw err;
                                con.query(query, function (err, result) {
                                    if (err) throw err;
                                    query = "INSERT INTO History (\n\
                                        gallonsRequested,\n\
                                        deliveryDate,\n\
                                        pricePerGallon,\n\
                                        totalPrice,\n\
                                        userID,\n\
                                        addressID)\n\
                                    VALUES (\n\
                                        " + galsRequested + ",\n\
                                        \"" + deliveryDate + "\",\n\
                                        " + pricePerGal + ",\n\
                                        " + cost + ",\n\
                                        " + userid + ",\n\
                                        " + result[0].addressID + ");";


                                    con.connect(function(err) {
                                        if (err) throw err;
                                        con.query(query, function (err, result) {
                                            if (err) throw err;
                                            res.json({success: "history.html"});
                                        });
                                    }); 
                                });
                            });
                        }
                    }
                }); 
            });
        } catch(error) {
            if(error.isJoi === true) {
                return next(new createError.BadRequest("Error. Invalid input."));
            }
        }
    } 
}
