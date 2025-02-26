import {useEffect, useState} from "react";

export function useFetch(fetchFn, initialValue = null) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  // useEffect to ensure there is no infinite loop when the component is rendered because of state change
  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const userPlaces = await fetchFn();
        setFetchedData(userPlaces);
      } catch (error) {
        setError({
          title: "An error occurred!",
          message: error.message || 'Failed to fetch data.'
        });
      }
      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);

  return {
    isFetching,
    error,
    fetchedData,
    setFetchedData
  };
}