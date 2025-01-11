import { useEffect,useState } from "react"
import axios from "axios"
import Error from "../routes/error"
const ChatRoom = ({chatRoom}) =>{
    const [messages,setMessages] = useState([])
    const [error,setError] = useState(null)
    const [user,setUser] = useState(null)
    const [mess,setMess] = useState("")
    


    useEffect(()=>{
        async function fetching(){
            try{
                const res = await axios.get(`http://localhost:3000/api/chats/${chatRoom}/messages`)
                setMessages(res.data.data)
                setUser(res.data.user)
                setError(null)
            }
            catch(err){
                setError(err.response.data.message || "Something went wrong when retrieving messages")
            }
        }
        fetching()
    },[chatRoom])




    const handleMessageChange = (e)=>{
        setMess(e.target.value)
    }   

    const handleMessageSubmit = async (e)=>{
        e.preventDefault()
        try{
            await axios.post(`http://localhost:3000/api/chats/${chatRoom}/messages`,{
                message: mess
            })
            setMessages((prevMessages) => [
                ...prevMessages,
                { message: mess, date: new Date().toLocaleString(), userId: user },
            ]);
        }
        catch(err){
            setError(err.response.data.message || "Cannot send message")
        }
        setMess("")
        
    }

    const onClickDelete = async (id)=>{
        try{
            await axios.delete(`http://localhost:3000/api/chats/${chatRoom}/messages/${id}`)
            setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
           
        }
        catch(err){
            setError(err.response.data.message || "Cannot delete message")
        }
    }

    return(
        <div>
            {error && <Error error={error}/>}
            <ul>
                {messages.map((message)=>{
                    if (message.userId === user) {
                        return (
                            <li key={message.id} style={{ backgroundColor: "green" }}>
                                <p>{message.message}</p>
                                <p>{message.date}</p>
                                <button onClick={() => onClickDelete(message.id)}>Delete</button>
                            </li>
                        );
                    } else {
                        return (
                            <li key={message.id} style={{ backgroundColor: "lightgrey" }}>
                                <p>{message.message}</p>
                                <p>{message.date}</p>
                            </li>
                        );
                    }

                })}
            </ul>
            <form onSubmit={handleMessageSubmit}>
                <input
                    type="text"
                    value={mess}
                    onChange={handleMessageChange}
                    placeholder="Send message"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default ChatRoom