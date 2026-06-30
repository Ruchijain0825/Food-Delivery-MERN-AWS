import React, { useState,useContext } from "react";
import axios from "axios";
import "./AiChatBot.css";
import { FoodContext } from "../../Context/FoodContext";
import { toast } from "react-toastify";
import FoodItem from "../fooditem/Fooditem";
const AIChat = ({ foodlist,name,foodId,rating }) => {
  const {url}=useContext(FoodContext);
  const{token,setToken} = useContext(FoodContext);
  const [activeTab, setActiveTab] = useState("ai");
  const[customerrating,setcustomerrating] = useState("")
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  
  const[comment,setcomment] =useState("")

  const askAI = async ({}) => {
    if (!message.trim()) return;

    try {
      setLoading(true);

      const response = await axios.post(
        "http://43.205.209.47/api/ai/chat",
        {
          message,
          foodList: foodlist,
        }
      );

      setReply(response.data.reply);
      setMessage("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const handleFeedbackForm = async()=>
  {
    const response = await axios.post(url+"/api/customer/feedbackform",{
        comments:comment
    },{headers:{token}}
     
)
  
if(response.data.success)
{
  toast.success(response.data.message)
}
else{
  toast.error(response.data.message)
}
  }
  return (
    <div className="ai-chat">
      <div className="tabs">
        <button
          className={activeTab === "ai" ? "active-tab" : ""}
          onClick={() => setActiveTab("ai")}
        >
          🤖 AI Chat
        </button>

        <button
          className={activeTab === "feedback" ? "active-tab" : ""}
          onClick={() => setActiveTab("feedback")}
        >
          ⭐ Feedback
        </button>
      </div>

      {activeTab === "ai" ? (
        <>
          <div className="ai-header">
            🤖 Food AI Assistant
          </div>

          <input
            type="text"
            value={message}
            placeholder="Ask Food AI..."
            onChange={(e) => setMessage(e.target.value)}
          />

          <button className="send-btn" onClick={askAI}>
            Send
          </button>

          {loading ? (
            <p className="loading">Thinking...</p>
          ) : (
            reply && (
              <div className="ai-response">
                {reply}
              </div>
            )
          )}
        </>
      ) : (
        <>
          <div className="ai-header">
            ⭐ Share Your Feedback
          </div>

          <textarea
            rows="4"
            placeholder="Write your feedback here..."
            value={comment}
            onChange={(e) => setcomment(e.target.value)}
          />

          <button
            className="send-btn"
            onClick={handleFeedbackForm} disabled ={!token}
          >
            Submit Feedback
          </button>
          
        </>
      )}
    </div>
  );
};

export default AIChat;