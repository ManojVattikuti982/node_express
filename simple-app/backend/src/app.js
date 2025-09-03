import { log } from "console";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
let app = express();

//db connection
async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("db connected");
  } catch (error) {
    console.log("db connection error", error.message);
  }
}
dbConnect();

//schema for simple-app
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      enum: ["stationery", "kitchen", "electronics", "apparels"],
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    isFastMoving: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }//createdAt,updatedAt
); 

//model
let Product=mongoose.model("Product",productSchema)

//middleware--parses incoming json data
app.use(express.json())

//create product
app.post("/products",async (req,res,next)=>{
   let {productName,price,category}=req.body;
    try{
        if(!productName || !category){
            res.status(400).jason({message:"please fill all fields"})
            return;
        }
        let newProduct = await Product.create({
            productName,
            price,
            category
        })
        if(!newProduct){
            res.status(400).json({message:"Error creating product"})
            return;
        }
        res.status(201).json(newProduct)
    } catch(error){
        console.log("error in creating product",error);
        res.status(500).json({message:"internal server error"})
        return;
    }
})

//get all products
//advanced search feature
app.get("/products",async (req,res,next)=>{
    try{
        let query = {};
         // { "<field>": { "$regex": "pattern", "$options": "<options>" } }
        if (req.query.search) {
        query.productName = { "$regex": req.query.search, "$options": "i" };
        }  
        if(req.query.category){
            query.category = req.query.category;
        }
        let products=await Product.find(query);
        if(products?.length<=0){
            res.status(404).json({message:"no products found"});
            return;
        }
        res.status(200).json(products);
    } catch(error){
        log("error in getting products route",error);
        res.status(500).json({message:"internal server error"});
    }
});

//get single product by id
//dynamic url route
//route parametes--they are named url segments which can be captured
//The captured values are populated in the req.params object
app.get("/products/:id",async (req,res,next)=>{
    try{
        let {id}=req.params;
        let product = await Product.findById(id);
        if(!product){
            res.status(404).json({message:`no product found with id ${id}`});
            return;
        }
        res.status(200).json(product)
    } catch(error){
        console.log("error in getting single product by id",error);
        res.status(500).json({message:"inetrnal server error"});
    }
});

//patch request--update partially
app.patch("/products/:id", async (req,res,next)=>{
    try{
        let {id}=req.params;
        let updatedProduct=await Product.findByIdAndUpdate(id,{...req.body},{new:true});
        if(!updatedProduct){
            res.status(404).json({message:`no product found with id ${id}`})
            return;
        }
        res.status(200).json(updatedProduct);
    } catch(error){
        console.log("error in updating product",error);
        res.status(500).json({message:"internal server error"});
    }
});

//delete product
app.delete("/products/:id", async (req,res,next)=>{
    try{
        let {id}=req.params;
        let deletedProduct = await Product.findByIdAndDelete(id);
        if(!deletedProduct){
            res.status(404).json({message:`no product found with id ${id}`});
            return;
        }
    }catch(error){
        console.log(("error in deleting product",error));
        res.status(500).json({message:"internal server error"});
    }
    res.status(204).json({}); //no content to send back
})

export default app;