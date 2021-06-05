import { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import {
  sendPasswordResetEmail,
  setError,
  setSuccess
} from '../../store/actions/auth.actions';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Message from '../UI/Message';

const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const { error, success } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(''));
      }

      if (success) {
        dispatch(setSuccess(''));
      }
    };
  }, [error, dispatch, success]);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    await dispatch(sendPasswordResetEmail(email, 'Email sent!'));
    setIsLoading(false);
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="has-text-centered is-size-2 mb-3">Reset Password</h2>
        <form className="form" onSubmit={submitHandler}>
          {error && <Message type="danger" message={error} />}
          {success && <Message type="success" message={success} />}
          <Input
            type="email"
            name="email"
            value={email}
            placeholder="Email address"
            label="Email address"
            onChange={event => setEmail(event.target.value)}
          />

          <Button
            text={isLoading ? 'Loading...' : 'Send password reset email'}
            className="is-primary is-fullwidth mt-5"
            disabled={isLoading}
          />
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
