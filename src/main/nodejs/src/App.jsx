import { Routes, Route } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Slider from "../components/Slider"
import '../css/style.css';

import './App.css';

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Slider/>
      {/* <Stories/> */}
    </div>
  );
};

export default App;
