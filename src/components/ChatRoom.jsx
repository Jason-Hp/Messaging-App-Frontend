import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Error from "../routes/error";


const ChatRoom = ({ chatRoom,socket }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [mess, setMess] = useState("");
  


  useEffect(() => {
  
    socket.on(`message-${chatRoom}`, (message) => {
      if (message.mode == "create"){
        setMessages((prevMessages) => [...prevMessages, message]);
      }else{
        setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== message.msgId));
      }
      
    });


    async function fetching() {
      try {
        const res = await axios.get(`http://localhost:3000/api/chats/${chatRoom}/messages`);
        setMessages(res.data.data);
        setUser(res.data.user);
        setError(null);
      } catch (err) {
        setError(err.response.data.message || "Something went wrong when retrieving messages");
      }
    }

    fetching();
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [chatRoom,socket]);

  const handleMessageChange = (e) => {
    setMess(e.target.value);
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/api/chats/${chatRoom}/messages`, {
        message: mess,
      });
      const messageSent = { message: mess, date: new Date().toLocaleString(), userid: user, mode: "create", msgId:null,chatRoom };
   
      socket.emit("message", messageSent);
      //I think the socket listener above shld alr do the below
      //setMessages((prevMessages) => [...prevMessages, messageSent]);
    } catch (err) {
      setError(err.response.data.message || "Cannot send message");
    }
    setMess("");
  };

  const onClickDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/chats/${chatRoom}/messages/${id}`);
      const messageSent = { message: mess, date: new Date().toLocaleString(), userid: user, mode: "delete", msgId:id,chatRoom };
      socket.emit("message", messageSent);

    } catch (err) {
      setError(err.response.data.message || "Cannot delete message");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-lg">
      {error && <Error error={error} />}
      <ul className="space-y-2">
        {messages.map((message) => {
          return (
            <li
              key={message.id}
              className={`p-2 rounded ${message.userid === user ? "bg-green-200 ml-auto max-w-xs" : "bg-gray-200 mr-auto max-w-xs"}`}
              style={{
                textAlign: message.userid === user ? "right" : "left",
              }}
            >
              <p>{message.message}</p>
              <p className="text-sm text-gray-500">{message.date}</p>
              {message.userid === user && (
                <button
                  onClick={() => onClickDelete(message.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              )}
            </li>
          );
        })}
      </ul>
      <form onSubmit={handleMessageSubmit} className="mt-4 flex">
        <input
          type="text"
          value={mess}
          onChange={handleMessageChange}
          placeholder="Send message"
          className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-200"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;