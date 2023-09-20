import { Todo } from "../models/todo";
import { User } from "../models/user";
async function fetchData(input:RequestInfo, init?:RequestInit) {
    const response  = await fetch(input, init);

    if(response.ok){
            return response;
    }else{
            const errorBody = await response.json();

            const errorMessage = errorBody.error;

            throw new Error(errorMessage);
    }
}   

export async function getLogedInUser(): Promise<User> {
    const response = await fetchData("/api/users",{method : "GET"});   
    return response.json();    
}

export interface SignUpCredentials {
    username : string,
    email : string, 
    password : string
}
export async function signUp (credentials : SignUpCredentials) : Promise<User>{
    const response = await fetchData("/api/users/signup", 
    {
            method : "POST",
            headers : {
                    "Content-Type" : "application/json",
            },
            body : JSON.stringify(credentials)
    })     
    return response.json(); 
}

export interface LoginCredentials {
    username : string,
    password : string,
}

export async function login(credentials : LoginCredentials) : Promise<User> {
    const response = await fetchData("/api/users/signup", 
    {
            method : "POST",
            headers : {
                    "Content-Type" : "application/json",
            },
            body : JSON.stringify(credentials)
    })     
    return response.json();        
}

export async function logout() {
    await fetchData("/api/users/logout", {method : "POST"});        
}

export async function fetchNotes(): Promise<Todo[]> {
    const response = await fetchData("/api/todos", {method :"GET"});
    return response.json();
}

export interface TodoInput {
    title? : string,
    text? : string,
}

export async function createTodo(todo : TodoInput): Promise<Todo>{
    const response = await fetchData("/api/todos",
    {
            method : "POST",
            headers : {
                    "Content-Type" : "application/json",
            },
            body : JSON.stringify(todo),
    });

    return response.json();
}

export async function updateNote(todoId : string, todo : TodoInput): Promise<Todo>{
    const response = await fetchData("/api/todos/" + todoId, 
    {
            method : "PATCH",
            headers :  {
                    "Content-Type" : "application/json",
            },
            body : JSON.stringify(todo)
    });
    return response.json();
}

export async function deleteTodo(todoId:string) {
    await fetchData("/api/todos/" + todoId , {method : "DELETE"});
}