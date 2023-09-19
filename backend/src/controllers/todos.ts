import { RequestHandler } from "express";
import todoModel from '../models/todo'
import createHttpError from "http-errors";
import mongoose from "mongoose";
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
        if (!mongoose.isValidObjectId(todoId)) {
            throw createHttpError(400, "Invalid note id");
        }

        const todo  = await todoModel.findById(todoId).exec();
        if(!todo){
            throw createHttpError(404, "Note not found");
        }
        res.status(200).json(todo);
    }catch(error){
        next(error);
    }
}

interface createTodoBody {
    title? : string,
    text? : string,
    isCompleted? : boolean
}

export const createTodos : RequestHandler<unknown, unknown, createTodoBody, unknown> = async (req, res, next)=>{
    const title = req.body.title;
    const text  = req.body.text;
    const isCompleted = req.body.isCompleted;

    try{
        if (!title) {
            throw createHttpError(400, "Note must have a title");
        }
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