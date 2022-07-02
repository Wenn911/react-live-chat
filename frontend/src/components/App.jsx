import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PageNotFound from "./PageNotFound";
import LoginForm from "./LoginForm";
import { useAuth } from "../hooks";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { socketContext } from "../contexts/index.js";
import Chat from "./Chat";
import AuthProvider from "../contexts/AuthProvider";


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
