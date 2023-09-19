import { Card } from "react-bootstrap";
import { Todo as TodoModel } from "../models/todo";
import styles from "../styles/Todo.module.css";
import styleUtils from '../styles/utils.module.css'
import { formatDate } from "../utils/formatDate";
import {MdDelete} from 'react-icons/md';
interface TodoProps {
    todo : TodoModel,
    onToDoClicked : (todo : TodoModel)=> void,
    onDeleteTodoClicked : (todo : TodoModel)=>void,
    className? : string
}
const Todo = ({todo, onToDoClicked ,onDeleteTodoClicked,className}: TodoProps) => {
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
        <Card 
        className={`${styles.todoCard} ${className}`}
        onClick={()=> onToDoClicked(todo)}
        >
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.flexCenter}>
                    {title}
                    <MdDelete 
                        className="text-muted ms-auto"
                        onClick={(e)=>{
                            onDeleteTodoClicked(todo);
                            e.stopPropagation();
                        }}
                    />
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