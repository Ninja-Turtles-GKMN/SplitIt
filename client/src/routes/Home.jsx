import { useLoaderData } from 'react-router-dom';
import React from 'react';

export default function Home() {
  const events = useLoaderData();
  console.log(Object.keys(events));
  return <div></div>;
}

//loader function
export const eventLoader = async () => {
  const data = await fetch('http://localhost:3000');
  const parsed = data.json();
  return parsed;
};
