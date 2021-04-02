import { parse } from "dotenv/types";
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


                        query = `SELECT\n\ 
                            gallonsRequested,\n\
                            address1,\n\
                            address2,\n\
                            city,\n\
                            state,\n\
                            zipcode,\n\
                            deliveryDate,\n\
                            pricePerGallon,\n\
                            deliveryDate,\n\
                            totalPrice\n\
                        FROM History\n\
                        INNER JOIN Addresses ON History.addressID = Addresses.addressID\n\
                        WHERE History.userID = ` + result[0].userID + ";";


                        con.connect(function(err) {
                            if(err) throw err;
                            con.query(query, function (err, result) {
                                if(err) throw err;

                                let parsed = `<table style='width:100%'>\n\
    <tr>\n\
        <th><b>Delivery Date</b></th>\n\
        <th><b>Gallons Requested</b></th>\n\
        <th><b>Price Per Gallon</b></th>\n\
        <th><b>Total Price</b</th>\n\
        <th><b>Address</b></th>\n\
    </tr>\n`;
                                for(let object of result) {
                                    parsed += ` \<tr\>\n\
        <th> ${object.deliveryDate} </th>\n\
        <th> ${object.gallonsRequested} </th>n\
        <th>\$${object.pricePerGallon}</th>\n\
        <th>\$${object.totalPrice}</th>\n\
        <th>${object.address1}<br>\
        ${object.address2}<br>\
        ${object.city}, ${object.state}, ${object.zipcode}<br><br></th>\n\
    </tr>`
                                }
                                parsed += "</table>";
                                res.json({success: parsed});
                            });
                        });
                    }
                });
            });
        } catch (error) {
            if(error.isJoi === true) {
                return next(new createError.BadRequest("Error. Invalid Username!"));
            }
            next(error);
        }
    }
}