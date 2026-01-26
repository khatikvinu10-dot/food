import { useContext, useEffect, useState } from "react";
import './SearchResult.css'
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";

const SearchResults = () => {

  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:4000/api/food/search?q=${encodeURIComponent(query)}`
        );
        setResults(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) return <h2>Loading...</h2>;

  return (

    <div className="search-results">
      <h2>Results for "{query}"</h2>

      {results?.length === 0 ? (
        <p>No food found</p>
      ) : (
        results?.map((item) => (
          <div key={item._id} className="food-card">
            <img
              src={`${url}/images/${item.image}`}
              alt=''
            />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>₹{item.price}</p>
            {!cartItems?.[item._id] ? (
              <img className="add" onClick={() => addToCart(item._id)} src={assets.add_icon_white} alt="" />
            ) : (
              <div className="food-item-counter">
                <img onClick={() => removeFromCart(item._id)} src={assets.remove_icon_red} alt="" />
                <p>{cartItems[item._id]}</p>
                <img onClick={() => addToCart(item._id)} src={assets.add_icon_green} alt="" />
              </div>
            )}

          </div>
        ))
      )}
    </div>
  );
};

export default SearchResults;
