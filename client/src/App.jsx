import React, { useState, createContext } from 'react';
import { Outlet, Link, Form } from 'react-router-dom';
import './index.css';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const sendLogin = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const username = data.get('username');
    const password = data.get('password');

    const loginBody = JSON.stringify({ username, password });

    const post = await fetch('http://localhost:3000/login', {
      method: 'POST',
      body: loginBody,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    console.log(post.status);
    if (post.status === 200) {
      console.log('routing to home!');
      navigate('/home');
    } else {
      navigate('/createaccount');
    }
  };
  const gitHubRedirect = fetch('/api/github', {
    method: 'get',
  });

  return (
    <>
      <div id='login-body' className='standard-body'>
        <div className='standard-title'>
          <h1>Split It & Quit It</h1>
        </div>
        <form
          id='login-form'
          className='standard-form'
          role='form'
          action='/api/login'
          onSubmit={sendLogin}
        >
          <input
            className='standard-input'
            aria-label='login-username-input'
            placeholder='username'
            type='text'
            name='username'
          />
          <input
            className='standard-input'
            aria-label='login-password-input'
            placeholder='password'
            type='password'
            name='password'
          />
          <button className='standard-button' type='submit'>
            Submit
          </button>
        </form>
        {/* <button className='github oauth' onClick={() => {fetch('/api/github', {
    method: 'get'
  });}}> */}
        {/*   
          Sign-In with Github
        </button> */}
        <a href='http://localhost:3000/github'>Sign in with Github</a>
        <Link to={'/createaccount'} id='standard-rdr'>
          New here? Create an Account
        </Link>
      </div>
    </>
  );
};

export default App;
