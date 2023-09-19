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

interface UpdateNoteParams {
    todoId : string,
}

interface UpdateTodoBody {
    title? : string,
    text? : string,
    isCompleted? : boolean,
}
export const updateTodo : RequestHandler<UpdateNoteParams, unknown, UpdateTodoBody, unknown> = async(req, res, next)=>{
    const todoId = req.params.todoId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    const updateIsCompleted = req.body.isCompleted;

    try{
        if (!mongoose.isValidObjectId(todoId)) {
            throw createHttpError(400, "Invalid note id");
        }
        if (!newTitle) {
            throw createHttpError(400, "Note must have a title");
        }

        const todo = await todoModel.findById(todoId).exec();
        
        if(!todo){
            throw createHttpError(404, "Note not found");
        }

        todo.title = newTitle;
        todo.text = newText;
        todo.isCompleted = updateIsCompleted;

        const updatedTodo = await todo.save();
        res.status(200).json(updatedTodo);
    }catch(error){
        next(error);
    }
}

export const deleteTodo : RequestHandler = async (req, res, next)=>{
    const todoId = req.params.todoId;

    try{
        if (!mongoose.isValidObjectId(todoId)) {
            throw createHttpError(400, "Invalid note id");
        }

        const todo = await todoModel.findById(todoId);

        if(!todo){
            throw createHttpError(404, "Note not found");
        }

        await todo.deleteOne();
        res.sendStatus(204);
    }catch(error){
        next(error);
    }

}