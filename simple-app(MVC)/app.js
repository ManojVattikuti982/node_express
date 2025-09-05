import "dotenv/config";
import express from "express";
import productRoutes from "./routes/productRoutes.js";

let app = express();

import dbConnect from "./config/db.js";
dbConnect();

//set view engine -- //registering template engine
app.set("view engine","ejs");

//middleware--parses incoming json data
app.use(express.json());

//serves static resources from specified folder
app.use(express.static("public"));

//product base routes
app.use("/products",productRoutes);

export default app;