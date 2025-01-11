import { useEffect, useState } from "react";
import axios from "axios"
import Error from "../routes/error";
import ChatRoom from "./ChatRoom"
const Sidebar = ()=>{
    const [chats,setChats] = useState(null)
    const [error,setError] = useState(null)
    const [chatRoom,setChatRoom] = useState(null)
    useEffect(()=>{
        async function fetching(){
            try{
                const res = await axios.get("http://localhost:3000/api/chats")
                setChats(res.data.data)
                setError(null)
            }
            catch(err){
                setError(err.response.data.message || "Unable to get chats. Please try again")
            }

        }
        fetching()
    },[])

    const onClick = (chatId)=>{
        setChatRoom(chatId)
    }

    return(
        <div>
            <div>
                {error && <Error error={error}/>}
                <ul>
                    {chats?.map((chat)=><li key={chat.id} onClick={()=>onClick(chat.id)}>
                        {chat.title}
                    </li>)}
                </ul>
            </div>
            <div>
                {chatRoom && <ChatRoom chatRoom={chatRoom}/>}
            </div>
        </div>
        
    )
}

export default Sidebar;