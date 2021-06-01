import { ThunkAction } from 'redux-thunk';

import {
  SignUpData,
  AuthAction,
  SET_USER,
  User,
  SET_LOADING,
  SIGN_OUT,
  SignInData,
  SET_ERROR,
  NEED_VERIFICATION,
  SET_SUCCESS
} from '../types';
import firebase from '../../firebase/config';

import { RootState } from '..';

export const signup = (
  data: SignUpData,
  onError: () => void
): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password);

      if (response.user) {
        const userData: User = {
          id: response.user.uid,
          firstName: data.firstName,
          email: data.email,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        await firebase
          .firestore()
          .collection('/users')
          .doc(response.user.uid)
          .set(userData);
        await response.user.sendEmailVerification();

        dispatch({
          type: NEED_VERIFICATION
        });
        dispatch({
          type: SET_USER,
          payload: userData
        });
      }
    } catch (error) {
      console.log(error);
      onError();
      dispatch(setError(error.message));
    }
  };
};

export const getUserById = (
  id: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    try {
      const user = await firebase.firestore().collection('users').doc(id).get();

      if (user.exists) {
        const userData = user.data() as User;

        dispatch({
          type: SET_USER,
          payload: userData
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const setLoading = (
  value: boolean
): ThunkAction<void, RootState, null, AuthAction> => {
  return dispatch => {
    dispatch({
      type: SET_LOADING,
      payload: value
    });
  };
};

export const signin = (
  data: SignInData,
  onError: () => void
): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);
    } catch (error) {
      console.log(error);
      onError();
      dispatch(setError(error.message));
    }
  };
};

export const signout = (): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      await firebase.auth().signOut();
      dispatch({
        type: SIGN_OUT
      });
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };
};

export const setError = (
  message: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return dispatch => {
    dispatch({
      type: SET_ERROR,
      payload: message
    });
  };
};

export const setNeedVerification = (): ThunkAction<
  void,
  RootState,
  null,
  AuthAction
> => {
  return dispatch => {
    dispatch({
      type: NEED_VERIFICATION
    });
  };
};

export const setSuccess = (
  message: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return dispatch => {
    dispatch({
      type: SET_SUCCESS,
      payload: message
    });
  };
};

export const sendPasswordResetEmail = (
  email: string,
  successMessage: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      dispatch(setSuccess(successMessage));
    } catch (error) {
      console.log(error);
      dispatch(setError(error.message));
    }
  };
};
