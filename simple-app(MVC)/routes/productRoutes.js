import express from 'express';
let router = express.Router();

import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/productController.js';

router.get("/home",(req,res)=>{
    let userName = "Manoj"
    res.render("home",{userName})
})

//create product
router.post("/",createProduct);

//get all products
//advanced search feature
router.get("/", getProducts);

//get single product by id
//dynamic url route
//route parametes--they are named url segments which can be captured
//The captured values are populated in the req.params object
router.get("/:id", getProduct);

//patch request--update partially
router.patch("/:id", updateProduct);

//delete product
router.delete("/:id", deleteProduct);

export default router;