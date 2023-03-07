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
    const email = data.get('email');

    console.log(username, password);
    const userBody = JSON.stringify({ username, password, email });

    const post = await fetch(e.target.action, {
      method: 'POST',
      body: userBody,
    });

    if (post.status !== 200) navigate('/');
  };
  return (
    <>
      <div id='standard-body'>
        <h1>Welcome. Please create your account</h1>
        <form
          action='/api/create'
          id='standard-form'
          className='standard-form'
          role='form'
          onSubmit={createUser}
        >
          <input
            className='standard-input'
            aria-label='new-username-input'
            placeholder='username'
            type='text'
            name='username'
          />
          <input
            className='standard-input'
            aria-label='new-password-input'
            placeholder='password'
            type='password'
            name='password'
          />
          <input
            className='standard-input'
            aria-label='new-email-input'
            placeholder='email'
            type='text'
            name='email'
          />
          <button type='submit' className='standard-button'>
            {' '}
            Submit
          </button>
        </form>
        <Link to={'/'} className='standard-button white-button'>
          {' '}
          Go Back
        </Link>
      </div>
    </>
  );
};

export default CreateAccount;
