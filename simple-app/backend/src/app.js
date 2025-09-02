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

export default app;