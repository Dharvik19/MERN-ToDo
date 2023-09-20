import { Container, Navbar,Nav } from "react-bootstrap";
import { User } from "../models/user";
import NavBarLoggedInView from "./NavBarLoggedView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import {Link} from 'react-router-dom';
interface NavBarProps{
    loggedInUser: User | null,
    onSignUpClicked : () => void,
    onLoginClicked : () => void,
    onLogOutSuccessful : () => void,

}

const NavBar = ({loggedInUser, onSignUpClicked, onLoginClicked, onLogOutSuccessful} : NavBarProps) => {
    return ( 
        <Navbar bg = "primary" variant="dark" expand="sm" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to='/'>
                        Cool Notes 
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar"/>
                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-auto">
                        {   loggedInUser
                            ? <NavBarLoggedInView user={loggedInUser} onLogOutSuccessful={onLogOutSuccessful}/> :
                            <NavBarLoggedOutView onLogiInClicked={onLoginClicked} onSignUpClicked={onSignUpClicked}/>
                        }
                    </Nav>
                </Navbar.Collapse>    
            </Container>
        </Navbar>
     );
}

export default NavBar;