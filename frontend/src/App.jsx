import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import { useState } from "react";
import { authContext } from "./contexts";
import { useAuth } from "./hooks";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import LoginForm from "./components/LoginForm";

const AuthProvider = ({ children }) => {
  const userToken = localStorage.getItem('token');
  const [loggedIn, setLoggedIn] = useState(!!userToken);

  const login = ({ token, username }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setLoggedIn(false);
  };

  return (
    <authContext.Provider value={{ loggedIn, login, logout }}>
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

function App() {
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
