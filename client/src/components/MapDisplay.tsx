import { useEffect, useRef } from 'react';

const MapDisplay = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=[YOUR_API_Key]&callback=initMap`;
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
    <div>
      <h3>Map with Multiple Markers</h3>
      <div ref={mapRef} style={{ height: '500px', width: '100%' }}></div>
    </div>
  );
};

export default MapDisplay;
