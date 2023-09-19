import { Modal, Form, Button} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { Todo } from '../models/todo';
import { TodoInput } from '../network/todos_api';
import * as TodoApi from '../network/todos_api';
interface AddEditTodoDialogprops {
    todoToEdit? : Todo,
    onDismiss : ()=>void,
    onTodoSave : (todo: Todo)=> void
}
const AddEditTodoDialog = ({todoToEdit, onDismiss,onTodoSave} : AddEditTodoDialogprops) => {

    const {register, handleSubmit, formState :{errors, isSubmitting}} = useForm<TodoInput>({
        defaultValues : {
            title : todoToEdit?.title || "",
            text : todoToEdit?.text || "",
        }
    })

    async function onSubmit(input : TodoInput){
        try{
            let todoResponse : Todo;
            if(todoToEdit){
                todoResponse = await TodoApi.updateNote(todoToEdit._id, input);
            }else{
                todoResponse = await TodoApi.createTodo(input);
            }
            onTodoSave(todoResponse);
        }catch(error){
            console.error(error);
            alert(error)
        }
    }
    return ( 
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {todoToEdit ? "Edit Todo" : "Add Todo"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditTodoForm" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                            type='text'
                            placeholder="Input title"
                            isInvalid = {!!errors.title}
                            {...register("title", { required: "Required"})}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.title?.message}
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                            <Form.Label>Text</Form.Label>
                            <Form.Control
                            as='textarea'
                            rows={5}
                            placeholder="Input text"
                            {...register("text")}
                            />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type='submit'
                    form='addEditTodoForm'
                    disabled={isSubmitting}
                >Save</Button>
            </Modal.Footer>
        </Modal>
     );
}
 
export default AddEditTodoDialog;