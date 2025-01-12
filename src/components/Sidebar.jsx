import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Error from "../routes/error";
import ChatRoom from "./ChatRoom";
import { CartContext } from "../context";
import { io } from "socket.io-client";

const Sidebar = () => {
    const { user } = useContext(CartContext);
    const [chats, setChats] = useState(null);
    const [error, setError] = useState(null);
    const [chatRoom, setChatRoom] = useState(null);
    const [socket,setSocket] = useState(null)

    useEffect(() => {
        async function fetching() {
            try {
                const res = await axios.get("http://localhost:3000/api/chats");
                setChats(res.data.data);
                setError(null);
            } catch (err) {
                setError(err.response.data.message || "Unable to get chats. Please try again");
            }
        }
        fetching();
    }, []);

    const onClick = (chatId) => {
        setChatRoom(chatId);
        setSocket(io("http://localhost:3000", { withCredentials: true }));
    };

    return (
        <div className="flex h-screen"> 

            <div className="w-64 p-4 bg-gray-10 shadow-lg mr-4 border-r border-gray-30"> 
                <div className="mb-4">
                    {error && <Error error={error} />}
                    <ul>
                        {chats?.map((chat) => {
                            const username = user?.username;
                            const split = chat.title.split("|");
                            let title = "";
                            if (split[0] === username) {
                                title = split[1];
                            } else {
                                title = split[0];
                            }
                            return (
                                <li key={chat.id} onClick={() => onClick(chat.id)} className="cursor-pointer bg-gray-100 shadow-lg mr-4 border-r border-gray-300 p-2 hover:bg-blue-200 rounded mb-2">
                                    {title}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            <div className="flex-1 p-4 bg-white shadow-lg h-full"> 
                {chatRoom && <ChatRoom chatRoom={chatRoom} socket={socket} />}
            </div>
    </div>
    );
};

export default Sidebar;