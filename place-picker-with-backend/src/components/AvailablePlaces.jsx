import Places from './Places.jsx';
import ErrorPage from './Error.jsx';
import {sortPlacesByDistance} from "../loc.js";
import {fetchAvailablePlaces} from "../http.js";
import {useFetch} from "../hooks/useFetch.js";

async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const {latitude, longitude} = position.coords;
      console.log(latitude, longitude);
      const sortedPlaces = sortPlacesByDistance(places, latitude, longitude);
      resolve(sortedPlaces);
    });
  });
}

export default function AvailablePlaces({onSelectPlace}) {

  const {
    isFetching,
    error,
    fetchedData: availablePlaces,
  } = useFetch(fetchSortedPlaces, []);

  if (error) {
    return <ErrorPage title={error.title} message={error.message}/>;
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
