import { useLoaderData } from 'react-router-dom';
import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Feed from '../components/Feed.jsx';

export default function Home() {
  const events = useLoaderData();
  console.log(Object.keys(events));
  const arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(<Feed />);
  }
  return (
    <>
      <div className='homeDiv'>Hello</div>
      <Navbar></Navbar>
      {arr}
    </>
  );
}

//loader function
export const eventLoader = async () => {
  const data = await fetch('http://localhost:3000');
  const parsed = data.json();
  return parsed;
};
