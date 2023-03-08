import React from 'react';
import { Outlet, Link, Form } from 'react-router-dom';
import './index.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useEffect from 'react'

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
      <div id='standard-body'>
        <h1>Split It & Quit It</h1>
        <form
          id='standard-form'
          role='form'
          action='/api/login'
          onSubmit={sendLogin}
        >
          <input
            className='standard-submit'
            aria-label='login-username-input'
            placeholder='username'
            type='text'
            name='username'
          />
          <input
            className='standard-submit'
            aria-label='login-password-input'
            placeholder='password'
            type='password'
            name='password'
          />
          <button className='standard-button' type='submit'>
            Submit
          </button>
        </form>
        <Link to={'/createaccount'} id='standard-rdr'>
          New here? Create an Account
        </Link>
      </div>
    </>
  );
};

export default App;
