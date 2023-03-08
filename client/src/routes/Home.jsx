import { useLoaderData } from 'react-router-dom';
import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Feed from '../components/Feed.jsx';

export default function Home() {
  const eventsList = useLoaderData();

  console.log(eventsList, 'this');

  const arr = [];
  for (let i = 0; i < eventsList.length; i++) {
    arr.push(
      <Feed
        event={eventsList[i].event}
        date={eventsList[i].date}
        amount={eventsList[i].amount}
        users={eventsList[i].users}
      />,
    );
  }
  return (
    <>
      <Navbar></Navbar>
      <div className='homeDiv'>
        <div className='home-left sections tall-divider'></div>
        <div className='home-center sections feed-holder'>
          <div className='latest'>
            {' '}
            <h1>LATEST</h1>
          </div>

          {arr}
        </div>
        <div className='home-right sections tall-divider'>
          <div className='hi'></div>
        </div>
      </div>
    </>
  );
}

//loader function
export const eventLoader = async () => {
  const data = await fetch('http://localhost:3000/expense');
  const eventsList = await data.json();
  return await eventsList;
};
