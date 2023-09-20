import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as TodosApi from '../network/todos_api'
interface NavBarLoggedInViewProps {
    user : User,
    onLogOutSuccessful : ()=> void,
}

const NavBarLoggedInView = ({user, onLogOutSuccessful} : NavBarLoggedInViewProps) => {

    async function logout() {
        try{
            await TodosApi.logout();
            onLogOutSuccessful()
        }catch(error){
            console.error(error);
            alert(error);
        }
    }

    return (  
        <>
        <Navbar.Text>
            Signed in as: {user.username} 
        </Navbar.Text>
        <Button onClick={logout}>Logout</Button> 
        </>
    );
}

export default NavBarLoggedInView;