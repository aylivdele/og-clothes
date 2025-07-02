import { Routes, Route } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Slider from "../components/Slider"
import HomeCard from "../components/HomeCard"
import '../css/style.css';

import './App.css';

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Slider/>
      <HomeCard/>
      {/* <Stories/> */}
    </div>
  );
};

export default App;
