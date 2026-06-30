import React from "react";
import "./Orders.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import { assets, url, currency } from "../../assets/assets";
const Orders = ({ url }) => {
  const [feedback, setFeedBack] = useState([]);
  const [rating, setRating] = useState([]);
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`);
    if (response.data.success) {
      setOrders([...response.data.data].reverse());
      console.log(response.data.data);
    } else {
      toast.error("Error");
    }
  };
  const statusHandler = async (event, orderId) => {
    console.log(event, orderId);
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: event.target.value,
    });

    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  const handleAdminFeedback = async () => {
    try {
      const response = await axios.get(url + "/api/feedback/adminfeedback");
      if (response.data.success) {
        console.log("FEEDBACK RESPONSE", response.data);
        setFeedBack(response.data.data);
        console.log("feedback", feedback);
        console.log("orders", orders);
      }
    } catch (error) {
      console.log("error");
    }
  };
  const handleAdminRating = async () => {
    try {
      const response = await axios.get(url + "/api/rating/adminrating");
      if (response.data.success) {
        setRating(response.data.data);
      }
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    fetchAllOrders();
    handleAdminFeedback();
    handleAdminRating();
  }, []);
  useEffect(() => {
    console.log("orders state", orders);
  }, [orders]);

  useEffect(() => {
    console.log("feedback state", feedback);
  }, [feedback]);
  return (
    <>
      <div className="order-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            {/* Top Section */}
            <div className="order-top">
              <img src={assets.parcel_icon} alt="" className="order-icon" />

              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) =>
                    index === order.items.length - 1
                      ? item.name + " x " + item.quantity
                      : item.name + " x " + item.quantity + ", ",
                  )}
                </p>

                <span className="items-badge">
                  📦 Items : {order.items.length}
                </span>
              </div>

              <p className="order-price">
                {currency}
                {order.amount}
              </p>

              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
              >
                <option value="Food Processing">Food Processing</option>

                <option value="Out for delivery">Out for delivery</option>

                <option value="Delivered">Delivered</option>
              </select>
            </div>

            {/* Customer Info */}

            <div className="customer-card">
              <div className="customer-name">
                👤 {order.address.firstName} {order.address.lastName}
              </div>

              <div>
                <h4>📍 Address</h4>

                <p>
                  {order.address.street}, {order.address.city},{" "}
                  {order.address.state}, {order.address.country},{" "}
                  {order.address.zipcode}
                </p>
              </div>

              <div>
                <h4>📞 Phone</h4>
                <p>{order.address.phone}</p>
              </div>
            </div>

            {/* Review Section */}

            <div className="review-section">
              <div className="feedback-card">
                <h3>💬 Feedback</h3>

                {feedback
                  .filter(
                    (item) =>
                      item.userId?._id?.toString() === order.userId?.toString(),
                  )
                  .map((item) => (
                    <p key={item._id}>{item.comments}</p>
                  ))}
              </div>

              <div className="rating-card">
                <h3>⭐ Rating</h3>

                {rating
                  .filter(
                    (item) =>
                      item.userId?._id?.toString() === order.userId?.toString(),
                  )
                  .map((item) => (
                    <div key={item._id}>
                      <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star}>
                            {star <= item.rating ? "⭐" : "☆"}
                          </span>
                        ))}
                      </div>

                      <span className="rating-badge">{item.rating}/5</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Orders;
