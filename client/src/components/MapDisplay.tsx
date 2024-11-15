import { useEffect, useRef } from 'react';


import './MapDisplay.css';

const MapDisplay = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const url = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_API_Key}&callback=initMap`;
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (mapRef.current) {
        initMap(); // Ensure mapRef.current is defined
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initMap = () => {
    if (!mapRef.current) return; // Ensure mapRef.current is not null

    const map = new google.maps.Map(mapRef.current, {
      zoom: 4,
      center: { lat: 39.8283, lng: -98.5795 } // Centered on the USA
    });

    const locations = [
      { lat: 40.7128, lng: -74.0060 }, // New York
      { lat: 34.0522, lng: -118.2437 }, // Los Angeles
      { lat: 41.8781, lng: -87.6298 }, // Chicago
      { lat: 29.7604, lng: -95.3698 }, // Houston
      { lat: 33.4484, lng: -112.0740 } // Phoenix
    ];

    locations.forEach((location) => {
      new google.maps.Marker({
        position: location,
        map: map
      });
    });
  };

  return (
    <div className='map-container'>
      <h3 style={{color:'#f4f4f4'}}>USE THE DYNAMIC MAP TO EXPLORE YOUR FAVORITE AREAS</h3>
      <div ref={mapRef} style={{ height: '600px', width: '100%' }}></div>
    </div>
  );
};

export default MapDisplay;
