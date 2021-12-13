require("dotenv").config();

const mongoose = require("mongoose");
const { app } = require("./app");

Promise.all([
    app.listen(process.env.PORT),
    mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
    }),
])
    .then(() => {
        console.log(`🚀 Listening on port ${process.env.PORT}`);
    })
    .catch((err) => {
        console.error(`ERROR MONGO START: ${err.message}`);
    });
