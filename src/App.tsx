import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import './App.css';
import PrivateRoute from './components/auth/PrivateRoute';
import PublicRoute from './components/auth/PublicRoute';
import Dashboard from './components/pages/Dashboard';
import ForgotPassword from './components/pages/ForgotPassword';
import Homepage from './components/pages/Homepage';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import Header from './components/sections/Header';
import Loader from './components/UI/Loader';
import firebase from './firebase/config';
import { RootState } from './store';
import {
  getUserById,
  setLoading,
  setNeedVerification
} from './store/actions/auth.actions';

const App: FC = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        dispatch(setLoading(true));
        await dispatch(getUserById(user.uid));

        if (!user.emailVerified) {
          dispatch(setNeedVerification());
        }
      }

      dispatch(setLoading(false));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <Header />
      <Switch>
        <PublicRoute exact path="/" component={Homepage} />
        <PublicRoute exact path="/signup" component={SignUp} />
        <PublicRoute exact path="/signin" component={SignIn} />
        <PublicRoute exact path="/forgot-password" component={ForgotPassword} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
