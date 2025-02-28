import MealItem from "./MealItem.jsx";
import Error from "./Error.jsx";
import useHttp from "../hooks/useHttp.js";

const requestConfig = {}; // create the http config object here to avoid re-creating it on every render

export default function Meals() {

  const {
    data: loadedMeals,
    isLoading,
    error
  } = useHttp('http://localhost:3000/meals', requestConfig, []); // pass an empty array of meals as initial data

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error}/>;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal}/>
      ))}
    </ul>
  );
}