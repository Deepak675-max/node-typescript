import { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv"; 
dotenv.config();
import express from 'express';
import httpErrors from "http-errors";
import cors from "cors";

import todoRoutes from "./src/routes/todo.route";

const expenseTrackerBackendApp = express();

expenseTrackerBackendApp.use(cors());

import {sequelize} from './src/helper/common/init_mysql';


expenseTrackerBackendApp.use(express.json());
expenseTrackerBackendApp.use(express.urlencoded({ extended: true }));

expenseTrackerBackendApp.use("/api/todo", todoRoutes);

expenseTrackerBackendApp.use(async (req: Request, _res: Response, next: NextFunction) => {
    console.log(req, _res);
    next(httpErrors.NotFound(`Route not Found for [${req.method}] ${req.url}`));
});

// Common Error Handler
expenseTrackerBackendApp.use((error: any, req: Request, res: Response, next: NextFunction) => {
    const responseStatus = error.status || 500;
    const responseMessage =
        error.message || `Cannot resolve request [${req.method}] ${req.url}`;
    if (res.headersSent === false) {
        res.status(responseStatus);
        res.send({
            error: {
                status: responseStatus,
                message: responseMessage,
            },
        });
    }
    next();
});

const port = process.env.APP_PORT;

sequelize.sync({ alter: true })
    .then(() => {
        expenseTrackerBackendApp.listen(port, () => {
            console.log(`server is listening on the port of ${port}`);
        })
    })
    .catch((error: any) => {
        console.log(error);
        process.exit(0);
    })

process.on('SIGINT', () => {
    // Perform cleanup operations here
    console.log('Received SIGINT signal. application terminated successfully.');

    // Exit the application
    process.exit(0);
});




