import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Todo as TodoModel } from "./models/todo";
import Todo from "./components/Todo";
import styles from "./styles/TodoPage.module.css";
import styleUtils from './styles/utils.module.css'
import * as TodosApi from "./network/todos_api";
import AddTodoDialog from "./components/AddTodoDialog";

function App() {
  const [todos, setTodos] = useState<TodoModel[]>([]);

  const [showAddTodoDialog, setShowAddTodoDialog] = useState(false);

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

  return (
    <Container>
      <h1>TO-Dos</h1>
      <Button className={`${styleUtils.blockCenter} mb-4`}onClick={() => setShowAddTodoDialog(true)}>Add Note</Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {todos.map((todo) => (
          <Col>
            <Todo todo={todo} className={styles.todo} key={todo._id} />
          </Col>
        ))}
      </Row>
      {showAddTodoDialog && (
        <AddTodoDialog
          onDismiss={() => setShowAddTodoDialog(false)}
          onTodoSave={(newTodo) => {
            setTodos([newTodo, ...todos]);
            setShowAddTodoDialog(false);
          }}
        />
      )}
    </Container>
  );
}

export default App;
