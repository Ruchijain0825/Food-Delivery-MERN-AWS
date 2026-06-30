import { useState } from "react"

import AIChatBot from './AiChatBot';

import './AiChatBot.css';

function AIChat({foodlist,url})
{
    const[open,setOpen] = useState(false);

    return (
        <>
          <div className="chat-btn"
          onClick ={()=>setOpen(!open)}>🤖</div>

          {open&& ( <div className="chat-window"><AIChatBot foodlist ={foodlist} url = {url}/></div>)}
        </>
    );
}
export default AIChat;