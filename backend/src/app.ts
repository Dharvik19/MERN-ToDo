import "dotenv/config";
import express,{NextFunction, Request, Response} from 'express';
import todoRoutes from './routes/todos';
import morgan from 'morgan';
const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/todos", todoRoutes);

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