import { useRef, useState, useEffect } from 'react';

import logoImg from './assets/logo.png';
import {AVAILABLE_PLACES} from './data.js';
import {sortPlacesByDistance} from "./loc.js";

import Places from './components/Places.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import Modal from './components/Modal.jsx';

const storedPlaceIds = JSON.parse(localStorage.getItem('pickedPlaces')) || [];
const storedPlaces = storedPlaceIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
);

function App() {
  const modal = useRef();
  const selectedPlace = useRef();

  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude);
      setAvailablePlaces(sortedPlaces);
    });
  }, []);

  navigator

  function handleStartRemovePlace(id) {
    modal.current.open();
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    modal.current.close();
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    const storedPlaceIds = JSON.parse(localStorage.getItem('pickedPlaces')) || [];
    if (!storedPlaceIds.includes(id)) {
      localStorage.setItem('pickedPlaces', JSON.stringify([id, ...storedPlaceIds]));
    }
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    modal.current.close();

    const storedPlaceIds = JSON.parse(localStorage.getItem('pickedPlaces')) || [];
    localStorage.setItem(
      'pickedPlaces',
      JSON.stringify(storedPlaceIds.filter((id) => id !== selectedPlace.current))
    );
  }

  return (
    <>
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText={'No places found. Please enable location access.'}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
