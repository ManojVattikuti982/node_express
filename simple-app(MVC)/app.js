import "dotenv/config";
import express from "express";
import productRoutes from "./routes/productRoutes.js";
import methodOverride from 'method-override';

let app = express();

import dbConnect from "./config/db.js";
dbConnect();

//set view engine -- //registering template engine
app.set("view engine","ejs");

//middleware--parses incoming json data
app.use(express.json());

//middleware--parses incoming data
app.use(express.urlencoded({extended:true}))

//serves static resources from specified folder
app.use(express.static("public"));

//override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

//product base routes
app.use("/products",productRoutes);

export default app;