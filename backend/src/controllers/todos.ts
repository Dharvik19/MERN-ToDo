import { RequestHandler } from "express";
import todoModel from '../models/todo'

export const getTodos : RequestHandler = async (req , res, next)=>{
    try{
        const todos  = await todoModel.find().exec();
        res.status(200).json(todos);
    }catch(error){
        next(error);
    } 
}

export const getTodo : RequestHandler = async (req, res, next)=>{
    const todoId = req.params.todoId;

    try{
        const todo  = await todoModel.findById(todoId).exec();
        res.status(200).json(todo);
    }catch(error){
        next(error);
    }
}
export const createTodos : RequestHandler = async (req, res, next)=>{
    const title = req.body.title;
    const text  = req.body.text;
    const isCompleted = req.body.isCompleted;

    try{
        const newTodo = await todoModel.create({
            title : title,
            text : text,
            isCompleted : isCompleted,
        });
        res.status(201).json(newTodo);
    }catch(error){
        next(error);
    }
}