import "dotenv/config";
import express,{NextFunction, Request, Response} from 'express'
import todoModel from './models/todo';
const app = express();
app.get("/",async (req, res, next)=>{
    try{
        // throw Error("Bazinga")
        const todos  = await todoModel.find().exec();
        res.status(200).json(todos);
    }catch(error){
        next(error);
    }
    
})

app.use((req, res, next)=>{
    next(Error("EndPoint not found"));
})

app.use((error : unknown, req : Request, res : Response, next : NextFunction)=>{
    console.error(error);
    let errorMessage = "an unknown error occured";
    if(error instanceof Error) errorMessage = error.message;
    res.status(500).json({error : errorMessage})
    console.log(next);
})

export default app;