import { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { RootState } from '../../store';
import { signin, setError } from '../../store/actions/auth.actions';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Message from '../UI/Message';

const SignIn: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const { error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(''));
      }
    };
  }, [error, dispatch]);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (error) {
      dispatch(setError(''));
    }

    setIsLoading(true);
    dispatch(signin({ email, password }, () => setIsLoading(false)));
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="has-text-centered is-size-2 mb-3">Sign In</h2>
        <form className="form" onSubmit={submitHandler}>
          {error && <Message type="danger" message={error} />}
          <Input
            type="email"
            name="email"
            value={email}
            placeholder="Email address"
            label="Email address"
            onChange={event => setEmail(event.target.value)}
          />
          <Input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            label="Password"
            onChange={event => setPassword(event.target.value)}
          />

          <p>
            <Link to="/forgot-password">Forgot password ?</Link>
          </p>
          <Button
            text={isLoading ? 'Loading...' : 'Sign In'}
            className="is-primary is-fullwidth mt-5"
            disabled={isLoading}
          />
        </form>
      </div>
    </section>
  );
};

export default SignIn;
