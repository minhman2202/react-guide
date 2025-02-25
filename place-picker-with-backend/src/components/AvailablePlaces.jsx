import {useState, useEffect} from 'react';

import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  // useEffect to ensure there is no infinite loop when the component is rendered because of state change
  useEffect(() => {
    fetch('http://localhost:3000/places').then((response) => {
      return response.json();
    }).then((data) => {
      setAvailablePlaces(data.places);
    });
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
