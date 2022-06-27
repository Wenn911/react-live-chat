import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PageNotFound from "./PageNotFound";
import LoginForm from "./LoginForm";
import { useAuth } from "../hooks";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { authContext, socketContext } from "../contexts/index.js";
import Chat from "./Chat";


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

const App = ({ socket }) => {


  return (
    <AuthProvider>
      <socketContext.Provider value={socket}>
      <Router>
      <div className="d-flex flex-column h-100">
        <Switch>
          <PrivateRoute exact path="/">
            <Chat />
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
      </socketContext.Provider>
    </AuthProvider>
  );
}

export default App;
