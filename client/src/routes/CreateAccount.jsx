import React from 'react';
import { Outlet, Link, Form } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const navigate = useNavigate();
  const createUser = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data);
    const username = data.get('username');
    const password = data.get('password');

    console.log(username, password);
    const userBody = JSON.stringify({ username, password });

    const post = await fetch(e.target.action, {
      method: 'POST',
      body: userBody,
    });

    if (post.status !== 200) navigate('/');
  };
  return (
    <>
      pro chacho
      <div id='login-body'>
        <div id='login-form-parent'>
          <h1>Welcome. Please create your account</h1>
          <div>
            <form
              action='/api/create'
              id='new-user-form'
              role='form'
              onSubmit={createUser}
            >
              <input
                className='login-submit'
                aria-label='new-username-input'
                placeholder='username'
                type='text'
                name='username'
              />
              <input
                className='user-submit'
                aria-label='new-password-input'
                placeholder='password'
                type='password'
                name='password'
              />
              <button type='submit'>Submit</button>
            </form>
          </div>
          <Link to={'/login'} id='login-rdr'></Link>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
