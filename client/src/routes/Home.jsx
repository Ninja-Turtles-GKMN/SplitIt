import { useLoaderData } from 'react-router-dom';
import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Feed from '../components/Feed.jsx';

export default function Home() {
  const events = useLoaderData();
  console.log(Object.keys(events));
  const arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(
      <Feed
        event='restaurant'
        date='11/13/1993'
        users={[
          { username: 'mike', isPaid: true },
          { username: 'nic', isPaid: true },
        ]}
        amount={135}
      />
    );
  }
  return (
    <>
      <Navbar></Navbar>
      <div className='homeDiv'>
        <div className='home-left sections tall-divider'>hi</div>
        <div className='home-center sections feed-holder'>
          {' '}
          <h1>LATEST</h1>
          {arr}
        </div>
        <div className='home-right sections tall-divider'>
          <div className='createEvent'>Create New Event</div>
        </div>
      </div>
    </>
  );
}

//loader function
export const eventLoader = async () => {
  const data = await fetch('http://localhost:3000');
  const parsed = data.json();
  return parsed;
};
