import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import { User } from "./models/user";
import styles from "./styles/TodoPage.module.css";
import LoginModal from "./components/LoginModal";
import SignUpModal from "./components/SignUpModal";
import * as TodosApi from './network/todos_api';
import TodospageLoggedInView from "./components/TodospageLoggedInView";
import TodosPageLoggedOutView from "./components/TodosPageLoggedOutView";
function App() {
  

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showsignUpModel, setShowsignUpModel] = useState(false);
  const [showLoginModel, setShowLoginModel] = useState(false);

  useEffect(()=>{
    async function fetchLoggedInUser(){
      try{
        const user = await TodosApi.getLogedInUser();
        setLoggedInUser(user);
      }catch(error){
        console.error(error);
      }
    }
    fetchLoggedInUser();
  },[])
  

  
  return (
    <div>

    <NavBar
				loggedInUser={loggedInUser}
				onLoginClicked={()=>setShowLoginModel(true)}
        onSignUpClicked={()=>setShowsignUpModel(true)}
        onLogOutSuccessful={()=>setLoggedInUser(null)}
			/>
    <Container className={styles.todosPage}>
      
      <h1>TO-Dos</h1>
      <>
        {loggedInUser ?   
          <TodospageLoggedInView/> : 
          <TodosPageLoggedOutView/>
        }
      </>
    </Container>
      {
          showsignUpModel && 
          <SignUpModal
            onDismiss={()=>setShowsignUpModel(false)}
            onSignUpSuccessful={(user)=>{
            setLoggedInUser(user)
            setShowsignUpModel(false)
            }}
          />
        }
        {showLoginModel && 
          <LoginModal
            onDismiss={()=>setShowLoginModel(false)}
            onLoginSuccessful={(user)=>{
              setLoggedInUser(user)
              setShowLoginModel(false)
            }}
          />
        }
    </div>
  );
}

export default App;
