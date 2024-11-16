import React from 'react';
import MapDisplay from '../components/MapDisplay.tsx';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container container-fluid">
      {/* Title */}
      <h1 className="title text-center">Trek Mate</h1>

      {/* Search Bar */}
      <div className="search-bar-container">
        <input type="text" className='form-control' placeholder="Search for a trail or campsite..." />
      </div>

      {/* Main Content */}
      <div className="main-content row">
        {/* Sidebar for state list */}
        <div className="sidebar col-3">
          <button className='btn btn-primary'>Nav Bar</button>
          <div>List by state</div>
        </div>

        {/* Map Area */}
        <div className="map-container col-9">
          {/* Placeholder for DisplayMap */}
          <MapDisplay />
        </div>
      </div>
    </div>
  );
};

export default Home;