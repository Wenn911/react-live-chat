import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ToastContainer as Toaster } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import AuthProvider from '../contexts/AuthProvider';
import { socketContext } from '../contexts';
import Chat from './Chat.jsx';
import LoginForm from './LoginForm.jsx';
import PageNotFound from './PageNotFound.jsx';
import { useAuth } from '../hooks';
import SignUp from './SignUp';
import AppNavbar from './AppNavbar';
import getModal from './modals/index';
import { closeModal } from '../slices/modalSlice';

const renderModal = (type, onExited) => {
  if (!type) {
    return null;
  }

  const Modal = getModal(type);

  return <Modal onExited={onExited} />;
};

function PrivateRoute({ children, exact, path }) {
  const { loggedIn } = useAuth();

  return (
    <Route exact={exact} path={path}>
      {loggedIn ? children : <Redirect to="/login" />}
    </Route>
  );
}

function App({ socket }) {
  const { type } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const onModalExited = () => {
    dispatch(closeModal());
  };

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
          {renderModal(type, onModalExited)}
          <Toaster
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Router>
      </socketContext.Provider>
    </AuthProvider>
  );
}

export default App;
