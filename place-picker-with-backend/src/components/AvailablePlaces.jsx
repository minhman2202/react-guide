import {useState, useEffect} from 'react';

import Places from './Places.jsx';
import ErrorPage from './Error.jsx';
import {sortPlacesByDistance} from "../loc.js";
import {fetchAvailablePlaces} from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  // useEffect to ensure there is no infinite loop when the component is rendered because of state change
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const {latitude, longitude} = position.coords;
          console.log(latitude, longitude);
          const sortedPlaces = sortPlacesByDistance(places, latitude, longitude);
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        })
      } catch (error) {
        setError({
          title: 'An error occurred!',
          message: 'Failed to fetch places. Please try again later.',
        });
        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <ErrorPage title={error.title} message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Loading places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
