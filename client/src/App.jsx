import React from 'react';
import { Outlet, Link, Form } from 'react-router-dom';
import './index.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const sendLogin = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data);
    const username = data.get('username');
    const password = data.get('password');

    console.log(username, password);
    const loginBody = JSON.stringify({ username, password });

    const post = await fetch('/api/login', {
      method: 'POST',
      body: loginBody,
    });

    if (post.status !== 200) navigate('/contacts/:contactId');
  };
  return (
    <>
      <div id='login-body'>
        <div id='login-form-parent'>
          <h1>Please Login</h1>
          <div>
            <form
              id='search-form'
              role='form'
              action='/api/login'
              onSubmit={sendLogin}
            >
              <input
                className='login-submit'
                aria-label='login-username-input'
                placeholder='username'
                type='text'
                name='username'
              />
              <input
                className='login-submit'
                aria-label='login-password-input'
                placeholder='password'
                type='password'
                name='password'
              />
              <button type='submit'>Submit</button>
            </form>
          </div>
          <Link to={'/createaccount'} id='create-account-rdr'>
            New here? Create an Account
          </Link>
        </div>
      </div>
    </>
  );
};

export default App;
