import React, { useContext } from 'react';
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';



const FoodDisplay = ({ category }) => {

  const { food_list, search, ViewMenu } = useContext(StoreContext)
  const filteredFood = food_list.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  const url = "http://localhost:4000";
  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list?.map((item, index) => {
          if (category === "All" || category === item?.category) {
            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price}
              image={`${url}/images/${item.image}`} />
          }

        })}
        
      </div>
    </div>
  )
}

export default FoodDisplay;
