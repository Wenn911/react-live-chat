import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PageNotFound from './components/PageNotFound';
import Login from './components/Login';

function App() {
  return (
    <div className="d-flex flex-column h-100">
      <Router>
        <Switch>
          <Route exact path="/">
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
