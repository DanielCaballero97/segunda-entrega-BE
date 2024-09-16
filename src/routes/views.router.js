import { Router } from "express";

const viewsRouter = Router();

viewsRouter.get('/',(req,res)=>{
    res.render('Home');
})

viewsRouter.get('/products',(req,res)=>{
    res.render('RealTimeProducts/RealTimeProducts');
})




export default viewsRouter;

