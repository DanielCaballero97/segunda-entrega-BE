import { Router } from "express";
import ProductsManager from "../managers/productsManager.js";

const productsRouter = Router();

const productsManager = new ProductsManager();

productsRouter.get('/',async (req,res)=>{
    try{
        const products = await productsManager.getProducts();
        return res.send({products})
    }catch(error){
        console.log(error);
        return res.send("cannot get products")
    }
})

productsRouter.get("/:pid",async (req,res)=>{
    try{
        const {pid} = req.params;
        const parseId = parseInt(pid);
        if(isNaN(parseId)){
            return res.send("invalid Id")
        }
        const products = await productsManager.getProductsById(parseId)
        if(!products){
            return res.send("products not found");
        }
        return res.send({products})
    }catch(error){
        console.log(error);
        return res.send("Cannot get products")
    }
})


productsRouter.post('/',async (req,res)=>{
    console.log(req.body);
    const {id,title,description,code,price,status,stock,category,thumbnail} = req.body; //status siempre en TRUE , thumbnails siempre VACIOS
    if(!title||!description||!price||!stock||!category){
        return res.status(400).send({status:"error",error:"datos incompletos"});
    }
    const newProduct={
        id,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail
    }
    const product = await productsManager.addProduct(newProduct);
    res.send(product);
})


productsRouter.put('/:pid',async(req,res)=>{
    try{
        const {pid} = req.params;
        const parseId = parseInt(pid);
        if(isNaN(parseId)){
            return res.send("invalid Id")
        }
        const {id,title,description,code,price,status,stock,category,thumbnails} = req.body;

        const modifyProduct={
            id,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        }

        const products = await productsManager.modifyProductById(modifyProduct , parseId)

        if(!products){
            return res.send("products not found");
        }
        return res.send({products})

    }catch(error){
        console.log(error);
        return res.send("Cannot modify products")
    } 
})


productsRouter.delete('/:pid',async(req,res)=>{
    try{
        const {pid} = req.params;
        const parseId = parseInt(pid);
        if(isNaN(parseId)){
            return res.send("invalid Id")
        }
        const products = await productsManager.deleteProductById(parseId)
        if(!products){
            return res.send("product not found");
        }
        return res.send({products})
    }catch(error){
        console.log(error);
        return res.send("Cannot delete product")
    }
})



export default productsRouter;