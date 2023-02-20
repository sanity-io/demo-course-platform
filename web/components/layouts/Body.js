import React from "react";
import dynamic from 'next/dynamic'

const Course = dynamic(() => import('./Course'))
const Home = dynamic(() => import('./Home'))
const Legal = dynamic(() => import('./Legal'))
const Lesson = dynamic(() => import('./Lesson'))
const Presenter = dynamic(() => import('./Presenter'))

export default function Body({ layout, data }) {
  
  switch (layout) {
    case `course`:
      return <Course data={data} />;
    case `home`:
      return <Home data={data} />;
    case `legal`:
      return <Legal data={data} />;
    case `lesson`:
      return <Lesson data={data} />;
    case `presenter`:
      return <Presenter data={data} />;
    default:
      return null;
  }
}
