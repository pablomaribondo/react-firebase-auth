import { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { signup, setError } from '../../store/actions/auth.actions';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Message from '../UI/Message';

const SignUp: FC = () => {
  const [firstName, setFirstName] = useState('');
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
    dispatch(signup({ email, password, firstName }, () => setIsLoading(false)));
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="has-text-centered is-size-2 mb-3">Sign Up</h2>
        <form className="form" onSubmit={submitHandler}>
          {error && <Message type="danger" message={error} />}
          <Input
            name="firstName"
            value={firstName}
            placeholder="First name"
            label="First name"
            onChange={event => setFirstName(event.target.value)}
          />
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

          <Button
            text={isLoading ? 'Loading...' : 'Sign Up'}
            className="is-primary is-fullwidth mt-5"
            disabled={isLoading}
          />
        </form>
      </div>
    </section>
  );
};

export default SignUp;
