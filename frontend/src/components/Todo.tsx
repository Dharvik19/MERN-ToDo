import { Card } from "react-bootstrap";
import { Todo as TodoModel } from "../models/todo";
import styles from "../styles/Todo.module.css";
import { formatDate } from "../utils/formatDate";
interface TodoProps {
    todo : TodoModel,
    className? : string
}
const Todo = ({todo, className}: TodoProps) => {
    const { 
        title,
        text,
        isCompleted,
        createdAt,
        updatedAt
    } = todo

    let createdUpdatedText : string ;

    if(updatedAt > createdAt){
        createdUpdatedText ="updated at : " + formatDate(updatedAt);
    }else{
        createdUpdatedText = "created at : " + formatDate(createdAt);
    }

    return ( 
        <Card className={`${styles.todoCard} ${className}`}>
            <Card.Body className={styles.cardBody}>
                <Card.Title>
                    {title}
                </Card.Title>
                <Card.Text className={styles.todoText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                {createdUpdatedText}
            </Card.Footer>
        </Card>
     );
}
 


export default Todo;