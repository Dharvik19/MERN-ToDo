import { useEffect, useState } from "react";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import SignUpModal from "./components/SignUpModal";
import { User } from "./models/user";
import * as TodosApi from './network/todos_api';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import TodosPage from "./pages/TodosPage";
import NotFound from "./pages/NotFound";
import styles from './styles/App.module.css';
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
    <BrowserRouter>
    <div>

    <NavBar
				loggedInUser={loggedInUser}
				onLoginClicked={()=>setShowLoginModel(true)}
        onSignUpClicked={()=>setShowsignUpModel(true)}
        onLogOutSuccessful={()=>setLoggedInUser(null)}
			/>
    <Container className={styles.pageContainer}>
        <Routes>
            <Route
              path="/"
              element={<TodosPage loggedInUser={loggedInUser}/>}
            />
            <Route
              path="/*"
              element={<NotFound/>}
            />
            
        </Routes>

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
    </BrowserRouter>
  );
}

export default App;
