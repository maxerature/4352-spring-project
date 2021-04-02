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
            //If user exists
            await AuthSchema.validateAsync(req.body);
            const { username } = req.body;

            var mysql = require('mysql2');

            var con = await mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "password",
                port: 3306,
                database: "softwareproject"
            });

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
            con.connect(function(err) {
                if (err) throw err;
                con.query(query, function (err, result) {
                    if (err) throw err;
                    if(result == null || result == '') {
                        res.json({error: "You are in an incorrect account."});
                    }
                    else {
                        var hj = JSON.stringify(result);
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
