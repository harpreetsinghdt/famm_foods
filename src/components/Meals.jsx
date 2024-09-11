import React, { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
const requestConfig = {};
const Meals = () => {
  // const [loadedMeals, setLoadedMeals] = useState([]);
  // console.log("fetch meals");
  const url = import.meta.env.VITE_APP_BACKEND_URL + "/meals";
  // useEffect(() => {
  //   // fetch(url)
  //   //   .then((res) => res.json())
  //   //   .then((resData) => {
  //   //     console.log(resData);
  //   //     setLoadedMeals(resData);
  //   //   });

  //   const fetchData = async () => {
  //     const res = await fetch(url);
  //     const resData = await res.json();
  //     // console.log(resData);
  //     setLoadedMeals(resData);
  //   };
  //   fetchData();
  // }, []);

  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp(url, requestConfig, []);
  // console.log(loadedMeals);
  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }
  if (error) {
    return <Error title="Error occured!" message={error} />;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default Meals;
