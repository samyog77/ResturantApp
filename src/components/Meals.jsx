
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {};

export default function Meals(){
   const{
            data:loadedMeals,
            isLoading,
            error
        }= useHttp('http://localhost:3000/meals',requestConfig,[]);
    
        if (isLoading){
            return<p className="center">is fettching..</p>;
        }

        if (error){
            return <Error title ="Failed to fetch meals" message = {error}/>
        }
    
  return(
        <ul id="meals">
            {
                loadedMeals.map((meal) =>(
                    // <li key={meal.id}>
                    //     {meal.name}
                    // </li>
                    <MealItem key={meal.id} meal={meal}/>
                ))
            }
        </ul> 
    );

   
}