require("dotenv").config();
const mongoose = require("mongoose");

const dbUrl =
    process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/express-assignment-2";

mongoose
    .connect(dbUrl)
    .then((response) => {
        console.log("DB connection successful at: ", dbUrl);
    })
    .catch((err) => {
        console.log("DB connection failed at: ", dbUrl);
    });
