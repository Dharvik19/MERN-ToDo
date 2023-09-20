import  { InferSchemaType, Schema, model } from "mongoose";

const todoSchema = new Schema({
    userId : {type : Schema.Types.ObjectId, required : true},
    title : {type : String, required : true},
    text : {type : String},
    isCompleted : { type : Boolean},
}, {timestamps : true});

type Todo = InferSchemaType <typeof todoSchema>;

export default model<Todo>("Todo", todoSchema);