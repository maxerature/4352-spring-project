import express from "express";
import createError from "http-errors";
import userInfo from "../../../Common/users.json";
import {AuthSchema} from "../config/Validation/authQuoteLoad";

let userTS:any = userInfo;

export default {
    populate: async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            console.log("I'm in!");
            //If user exists
            await AuthSchema.validateAsync(req.body);
            const { username } = req.body;

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
            let query = "SELECT\n \
                address1,\n \
                address2,\n \
                city,\n \
                state,\n \
                zipcode\n \
            FROM Addresses\n \
            INNER JOIN Users ON Addresses.userID = Users.userID\n \
            WHERE\n \
                Addresses.active = true\n \
                AND Users.username = \"" + username + "\";";
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
                        var hj = JSON.stringify(result);
                        console.log(hj);
                        res.json({ addr1: result[0].address1, addr2: result[0].address2, city: result[0].city, state: result[0].state, zipCode: result[0].zipcode});
                    }
                });
            }); 


        } catch (error) {
            if(error.isJoi === true) {
                return next(new createError.BadRequest("Error. Invalid Username"));
            }
        }
    }
}
