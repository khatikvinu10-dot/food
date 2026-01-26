import React, { useContext, useEffect, useState } from "react";
import "./ViewMenu.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import FoodItem from "../../Components/FoodItem/FoodItem";


const ViewMenu = ({ category }) => {
  const { url } =
    useContext(StoreContext);
  const [foods, setFoods] = useState([]);
  const fetchFood = async () => {
    const resopnse = await axios.get("http://localhost:4000/api/food/list")
    if (resopnse.data.success) {
      setFoods(resopnse.data.data)
    }
  };
  useEffect(() => {
    fetchFood();
  }, [])

  console.log(foods);


  return (
    <div className="food-display-list">
      {foods
        ?.map((item) => (
          <FoodItem
            key={item._id}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={`${url}/images/${item.image}`}
          />
        ))}
    </div>
  );
};

export default ViewMenu;
