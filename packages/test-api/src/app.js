// Libs
import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";

import { routes } from "./routes";

import "dotenv/config";

// Connects to the Database -> then starts the express
// Create a new express application instance
export const app = express();

// Call midlewares
app.use(cors());
app.use(helmet());
app.use(
    bodyParser.json({
        verify(req, res, buf) {
            req.rawBody = buf;
        },
        limit: "70mb",
    })
);

// Set all routes from routes folder
app.use("/", routes);
