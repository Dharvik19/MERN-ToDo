import { InferSchemaType, Schema, model } from "mongoose";

const todoSchema = new Schema({
    title : {type : String, required : true},
    text : {type : String},
}, {timestamps : true});

type Todo = InferSchemaType <typeof todoSchema>;

export default model<Todo>("Todo", todoSchema);