import React from 'react';

const Feed = (props) => {
  const { event, date, users, amount } = props;
  return (
    <>
      {' '}
      <div className='feed-box'>
        <div>Event: {event}</div>
        <div>Date:{date}</div>
        <div>Amount owed: {amount}</div>
        <div>Participants: {users[0].username}</div>
      </div>
      <div className='horizontal-line-divider'></div>
    </>
  );
};

export default Feed;
