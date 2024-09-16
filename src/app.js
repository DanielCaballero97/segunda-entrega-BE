import express from 'express';
import handlebars from 'express-handlebars'

import productsRouter from './routes/products.router.js';
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from './routes/views.router.js';

import ProductsManager from "./managers/productsManager.js";

import { Server } from "socket.io";


import __dirname from './utils.js';

const app = express();

const PORT = process.env.PORT||8080;

const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`));

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');


app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/',viewsRouter);
app.use('/api/products',productsRouter);
app.use("/api/carts",cartsRouter);

const productsManager = new ProductsManager();

const io = new Server(server);

let a = await productsManager.getProducts()

io.on("connection", socketClient =>{

   io.emit("productsList",a);

   socketClient.on("newProductToAdd", newProduct=>{
      if(!newProduct.title||!newProduct.description||!newProduct.price||!newProduct.stock||!newProduct.category){
         return (false);
     }
     const product = productsManager.addProduct(newProduct);
   })

   socketClient.on("idToDelete", idDelete=>{
      const products = productsManager.deleteProductById(idDelete);
        if(!products){
            return (false);
        }
   })




})
