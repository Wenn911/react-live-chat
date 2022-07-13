import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import AuthProvider from '../contexts/AuthProvider'
import { socketContext } from '../contexts/';
import Chat from './Chat.jsx';
import LoginForm from './LoginForm.jsx';
import PageNotFound from './PageNotFound.jsx';
import { useAuth } from '../hooks/';
import SignUp from './SignUp';
import AppNavbar from "./AppNavbar";
import { ToastContainer as Toaster } from "react-toastify";


const PrivateRoute = ({ children, exact, path }) => {
  const { loggedIn } = useAuth();

  return (
    <Route exact={exact} path={path}>
      {loggedIn ? children : <Redirect to="/login" />}
    </Route>
  );
};

const App = ({ socket }) => {

  return (
    <AuthProvider>
      <socketContext.Provider value={socket}>
        <Router>
          <div className="d-flex flex-column h-100">
            <AppNavbar />
            <Switch>
              <PrivateRoute exact path="/">
                <Chat />
              </PrivateRoute>
              <Route path="/login">
                <LoginForm />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="*">
                <PageNotFound />
              </Route>
            </Switch>
          </div>
          <Toaster />
        </Router>
      </socketContext.Provider>
    </AuthProvider>
  );
};

export default App;