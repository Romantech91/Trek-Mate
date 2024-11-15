import React from 'react';
import MapDisplay from '../components/MapDisplay.tsx';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      {/* Title */}
      <h1 className="title">Trek Mate</h1>

      {/* Search Bar */}
      <div className="search-bar-container">
        <input type="text" placeholder="Search for a trail or campsite..." />
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Sidebar for state list */}
        <div className="sidebar">
          <button>Nav Bar</button>
          <div>List by state</div>
        </div>

        {/* Map Area */}
        <div className="map-container">
          {/* Placeholder for DisplayMap */}
          <MapDisplay />
        </div>
      </div>
    </div>
  );
};

export default Home;