import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Todo as TodoModel } from "./models/todo";
import Todo from "./components/Todo";
import styles from "./styles/TodoPage.module.css";
import styleUtils from './styles/utils.module.css'
import * as TodosApi from "./network/todos_api";
import AddEditTodoDialog from "./components/AddEditTodoDialog";
import {FaPlus} from 'react-icons/fa';
function App() {
  const [todos, setTodos] = useState<TodoModel[]>([]);

  const [showAddTodoDialog, setShowAddTodoDialog] = useState(false);
  const [todoToEdit,setTodoToEdit ] = useState<TodoModel | null>(null);
  useEffect(() => {
    async function loadNotes() {
      try {
        const todos = await TodosApi.fetchNotes();
        setTodos(todos);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  async function deleteTodo(todo : TodoModel){
    try{
      await TodosApi.deleteTodo(todo._id);
      setTodos(todos.filter( esitingTodo => esitingTodo._id !== todo._id))
    }catch(error){
      console.error(error);
      alert(error);
    }
  }
  return (
    <Container>
      <h1>TO-Dos</h1>
      <Button className={`${styleUtils.blockCenter} ${styleUtils.flexCenter} mb-4`}onClick={() => setShowAddTodoDialog(true)}>
        <FaPlus/>
        Add Note
        </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {todos.map((todo) => (
          <Col>
            <Todo 
            todo={todo} 
            className={styles.todo} 
            onToDoClicked={setTodoToEdit}
            onDeleteTodoClicked={deleteTodo}
            key={todo._id} />
          </Col>
        ))}
      </Row>
      {showAddTodoDialog && (
        <AddEditTodoDialog
          onDismiss={() => setShowAddTodoDialog(false)}
          onTodoSave={(newTodo) => {
            setTodos([newTodo, ...todos]);
            setShowAddTodoDialog(false);
          }}
        />
      )}
      {todoToEdit && 
        <AddEditTodoDialog
          todoToEdit={todoToEdit}
          onDismiss={()=>setTodoToEdit(null)}
          onTodoSave={(updatedTodo)=> {
            setTodos(todos.map(existingTodo=> existingTodo._id === updatedTodo._id ? updatedTodo : existingTodo));
            setTodoToEdit(null)
          }}
        />
      }
        
      
    </Container>
  );
}

export default App;
