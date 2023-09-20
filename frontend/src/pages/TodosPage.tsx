import React,{useState} from "react";
import { Container } from "react-bootstrap";
import TodosPageLoggedOutView from "../components/TodosPageLoggedOutView";
import TodospageLoggedInView from "../components/TodospageLoggedInView";
import { User } from "../models/user";
import styles from "../styles/TodoPage.module.css";

 interface TodosPageProps {
    loggedInUser : User | null,
 }
const TodosPage = ({loggedInUser} : TodosPageProps) => {

    return ( 
        <Container className={styles.todosPage}>
      
      <h2>TO-Dos</h2>
      
        <>
        {loggedInUser ?   
          <TodospageLoggedInView/> : 
          <TodosPageLoggedOutView/>
        }
      </>
    </Container>
     );
}
 
export default TodosPage;