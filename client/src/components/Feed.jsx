import React from 'react';

const Feed = (props) => {
  const { event, date, users, amount } = props;

  const arr = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].is_paid) {
      arr.push(
        <div className='userlist'>{users[i].username}(Already Paid)</div>,
      );
    } else {
      arr.push(
        <div className='userlist'>
          {users[i].username}(Still owes ya dough)
        </div>,
      );
    }
  }

  return (
    <>
      <div className='feed-box'>
        <div>Event: {event}</div>
        <div>Date:{date}</div>
        <div>Amount owed: {amount}</div>
        <div className='userlist userBold'>Participants:</div>
        <div className='userlist'> {arr}</div>
      </div>
      <div className='horizontal-line-divider'></div>
    </>
  );
};

export default Feed;
