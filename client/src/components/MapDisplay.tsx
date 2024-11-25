import { useEffect, useRef } from 'react';

//import './MapDisplay.css';

interface MapDisplayProps {
    locations: { lat: number; lng: number; name: string }[];
    zoomLevel?: number;
}

const MapDisplay = ({ locations, zoomLevel = 4 }: MapDisplayProps) => {
  const mapRef = useRef(null);

  useEffect(() => {
    window.initMap = initMap; // Make initMap available in global scope

    const url = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_API_KEY}&callback=initMap`;
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = initMap;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      delete window.initMap; // Clean up when component unmounts
    };
  }, [locations]); // Note: added locations to dependency array if you want to re-render map on location change

  const initMap = () => {
    if (!mapRef.current) return;

    const map = new google.maps.Map(mapRef.current, {
      zoom: zoomLevel,
      center: { lat: 39.8283, lng: -98.5795 } // Default center
    });

    const bounds = new google.maps.LatLngBounds();
    
    if (locations && locations.length > 0) {
      locations.forEach((location) => {
        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.name,
        });
        bounds.extend(marker.getPosition());
      });

      map.fitBounds(bounds);
    } else {
      map.setCenter({ lat: 39.8283, lng: -98.5795 });
    }
  };

  return (
    <div className='map-container'>
      <h3 style={{color:'#f4f4f4'}}>USE THE DYNAMIC MAP TO EXPLORE YOUR FAVORITE AREAS</h3>
      <div ref={mapRef} style={{ height: '600px', width: '100%' }}></div>
    </div>
  );
};

export default MapDisplay;