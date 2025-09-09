import Product from "../models/productModel.js";

export const createProduct = async (req,res,next)=>{
   let {productName,price,category}=req.body;
    try{
        await Product.create({
            productName,
            price,
            category
        })
        res.redirect("/products"); //GET /products
    } catch(error){
        console.log("error in creating product",error);
        res.status(500).json({message:"internal server error"})
        return;
    }
}

export const getProducts = async (req,res,next)=>{
    try{
        let {pname,category} = req.query;

        let query = {};
         // { "<field>": { "$regex": "pattern", "$options": "<options>" } }
        if (pname) { //req.query.search
        query.productName = { "$regex": pname, "$options": "i" };
        }  
        if(category){ //req.query.category
            query.category = category;
        }
        let products=await Product.find(query);
        res.render("home",{products});
    } catch(error){
        log("error in getting products route",error);
        res.status(500).json({message:"internal server error"});
    }
}

export const getProduct = async (req,res,next)=>{
    try{
        let {id}=req.params;
        let product = await Product.findById(id);
        if(!product){
            res.status(404).json({message:`no product found with id ${id}`});
            return;
        }
        res.render("UpdateProduct",{product});
    } catch(error){
        console.log("error in getting single product by id",error);
        res.status(500).json({message:"inetrnal server error"});
    }
}

export const updateProduct = async (req,res,next)=>{
    try{
        let {id}=req.params;
        await Product.findByIdAndUpdate(id,{...req.body});
        res.redirect("/products");
    } catch(error){
        console.log("error in updating product",error);
        res.status(500).json({message:"internal server error"});
    }
}

export const deleteProduct = async (req,res,next)=>{
    try{
        let {id}=req.params;
        await Product.findByIdAndDelete(id);
        res.redirect("/products")
    }catch(error){
        console.log(("error in deleting product",error));
        res.status(500).json({message:"internal server error"});
    }
}