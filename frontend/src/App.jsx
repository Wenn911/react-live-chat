import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import LoginForm from "./components/LoginForm";
import { useAuth } from "./hooks";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { authContext } from "./contexts/index.js";

function App() {

const AuthProvider = ({ children }) => {
    const userToken = localStorage.getItem('token');
    const [loggedIn, setLoggedIn] = useState(!!userToken);
  
    const logIn = ({ token, username }) => {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      setLoggedIn(true);
    };
  
    const logOut = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      setLoggedIn(false);
    };
  
    return (
      <authContext.Provider value={{ loggedIn, logIn, logOut }}>
        {children}
      </authContext.Provider>
    )
  };
  
  const PrivateRoute = ({ children, exact, path }) => {
    const { loggenIn } = useAuth();
  
    return (
      <Route exact={exact} path={path}>
        {loggenIn ? children : <Redirect to="/login" />}
      </Route>
    )
  };
  return (
    <AuthProvider>
      <Router>
      <div className="d-flex flex-column h-100">
        <Switch>
          <PrivateRoute exact path="/">

          </PrivateRoute>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
