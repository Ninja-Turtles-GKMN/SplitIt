import React from 'react';

export default function CreateForm() {
  async function handleClick() {
    const data = new FormData(e.target);
    const event = data.get('event');
    const date = data.get('date');
    const amount = data.get('amount');
    const participant = data.get('participant');

    const newEvent = JSON.stringify({ event, date, amount, participant });

    const post = await fetch('http://localhost:3000/expense', {
      method: 'POST',
      body: newEvent,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
  }
  return (
    <>
      <div>
        <div className='standard-title'>
          <h1>Add New Event</h1>
        </div>
        <form id='login-form' className='standard-form' role='form'>
          <input
            className='standard-input'
            aria-label='login-username-input'
            placeholder='Event'
            type='text'
            name='event'
          />
          <input
            className='standard-input'
            aria-label='login-password-input'
            placeholder='Date'
            type='text'
            name='date'
          />
          <input
            className='standard-input'
            aria-label='login-password-input'
            placeholder='Amount'
            type='text'
            name='amount'
          />
          <input
            className='standard-input'
            aria-label='login-password-input'
            placeholder='Participants'
            type='text'
            name='participant'
          />
          <button onSubmit={handleClick}>Submit</button>
        </form>
      </div>
    </>
  );
}
