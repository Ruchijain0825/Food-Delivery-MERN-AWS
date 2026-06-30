import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/food-del-assets/assets/frontend_assets/assets";
import { FoodContext } from "../../Context/FoodContext";
import AiChatBot from "../AiChatBot/AiChatBot.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const FoodItem = ({ image, name, price, desc, id }) => {
  const [rating, setrating] = useState(0);

  const {
    cartItems,
    addToCart,
    removeFromCart,
    url,
    token,
    settoken,
    currency,
  } = useContext(FoodContext);

  const handleStarRating = async (selectedstar) => {
    setrating(selectedstar);
    if (!token) {
      toast.error("register");
      return;
    }
    try {
      const response = await axios.post(
        url + "/api/rating/customerrating",
        {
          foodId: id,
          rating: selectedstar,
        },
        { headers: { token } },
      );

      if (response.data.success) {
        setrating(selectedstar);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response);

      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={image}
          alt=""
        />

        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              onClick={() => removeFromCart(id)}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              src={assets.add_icon_green}
              onClick={() => addToCart(id)}
              alt=""
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>

          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{ fontSize: "24px", cursor: "pointer" }}
                onClick={() => handleStarRating(star)}
              >
                {rating >= star ? "⭐" : "☆"}
              </span>
            ))}
          </div>
        </div>

        <p className="food-item-desc">{desc}</p>

        <p className="food-item-price">
          {currency}
          {price}
        </p>
      </div>
    </div>
  );
};

export default FoodItem;
