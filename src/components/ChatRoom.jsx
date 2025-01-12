import { useEffect, useState } from "react";
import axios from "axios";
import Error from "../routes/error";

const ChatRoom = ({ chatRoom, socket }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [mess, setMess] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    socket.on(`message-${chatRoom}`, (message) => {
      if (message.mode === "create") {
        setMessages((prevMessages) => [...prevMessages, message]);
      } else {
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
  }, [chatRoom, socket]);

  const handleMessageChange = (e) => {
    setMess(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); 
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("message", mess);
    if (file) {
      formData.append("file", file); 
    }

    try {
      const res = await axios.post(`http://localhost:3000/api/chats/${chatRoom}/messages`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });

      const messageSent = { 
        message: mess, 
        date: new Date().toLocaleString(), 
        userid: user, 
        mode: "create", 
        msgId: null, 
        file: res.data.filePath, 
        chatRoom 
      };

      socket.emit("message", messageSent);
    } catch (err) {
      setError(err.response.data.message || "Cannot send message");
    }
    setMess(""); 
    
  };

  const onClickDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/chats/${chatRoom}/messages/${id}`);
      const messageDeleted = { message: mess, date: new Date().toLocaleString(), userid: user, mode: "delete", msgId: id, file: null ,chatRoom };
      socket.emit("message", messageDeleted);
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
              style={{ textAlign: message.userid === user ? "right" : "left" }}
            >
           
              {message.file && (
                <div className="file-preview">
                  {message.file.endsWith('.jpg') || message.file.endsWith('.png') || message.file.endsWith('.jpeg')?(
                    <img src={`http://localhost:3000/${message.file}`} alt="image" className="max-w-full h-auto rounded" />
                  ):(
                    <div>
                      Download: 
                      <a href={`http://localhost:3000/${message.file}`} target="_blank" className="text-blue-600 hover:text-blue-800 underline">
                      {message.file.split('/').pop()}
                      </a>
                    </div>

                  )}
                </div>
              )}
  
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
        <input
          type="file"
          name="file"
          id="file"
          onChange={handleFileChange}
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