import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import { RootState } from '../../store';
import { signout } from '../../store/actions/auth.actions';
import Button from '../UI/Button';

const Header: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state: RootState) => state.auth);

  const logoutClickHandler = () => {
    dispatch(signout());
  };

  return (
    <div className="navbar is-spaced has-shadow">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to={authenticated ? '/dashboard' : '/'}>
            AppName
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-items">
            {authenticated ? (
              <Button text="Sign out" onClick={logoutClickHandler} />
            ) : (
              <div className="buttons">
                <Button
                  text="Sign up"
                  className="is-primary"
                  onClick={() => history.push('/signup')}
                />
                <Button
                  text="Sign ip"
                  onClick={() => history.push('/signin')}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
