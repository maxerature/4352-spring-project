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

            console.log(deliveryDate);

            var mysql = require('mysql2');

            console.log("past sql");
            var con = await mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "password",
                port: 3306,
                database: "softwareproject"
            });
            console.log("created connection");

            //Check if user exists

            let query = "SELECT userID\n\
                FROM Users\n\
                WHERE username = \"" + username + "\";";
            console.log(query);


            con.connect(function(err) {
                if (err) throw err;
                console.log("Connected!");
                con.query(query, function (err, result) {
                    if (err) throw err;
                    console.log("Result: " + result);
                    if(result == null || result == '') {
                        res.json({error: "You are in an incorrect account."});
                    }

                    else {
                        console.log("Got return!");
                        console.log(result);
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
                                console.log("Connected!");
                                con.query(query, function (err, result) {
                                    if (err) throw err;
                                    console.log("Result: " + result);
                                    console.log("Got return!");
                                    console.log(result);
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

                                    console.log(query);

                                    con.connect(function(err) {
                                        if (err) throw err;
                                        console.log("Connected!");
                                        con.query(query, function (err, result) {
                                            if (err) throw err;
                                            console.log(result);
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
