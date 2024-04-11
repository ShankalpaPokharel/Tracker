const mongoose = require("mongoose");

const { DB_NAME } = require("../constants");

const connectDB = async () => {
    console.log(process.env.MONGODB_URI, DB_NAME);
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}${DB_NAME}`
        );
        console.log(`\n MondoDB connected !! DB HOST: ${connectionInstance.connection.host} `)
    } catch (error) {
        console.log("Mongodb Connection *Error", error);
    }
};

module.exports = connectDB;

