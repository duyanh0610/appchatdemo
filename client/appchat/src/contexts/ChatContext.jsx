import { createContext, useCallback, useEffect, useState } from "react";
import { getRequest, baseUrl, postRequest } from "../utils/Service";
import { io } from "socket.io-client"

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChat] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatError, setUserChatError] = useState(null);
  const [currentChat, setCurrentChat] = useState(null)
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState(null)
  const [isMessageLoading, setIsMessageLoading] = useState(false)
  const [messageError, setMessageError] = useState(null)
  const [sendTextMessageError, setSendTextMessageError] = useState(null)
  const [newMessage, setNewMessage] = useState(null)
  const [socket, setSocket] = useState(null)
  const [onlineUser, setOnlineUser]= useState([])
  // if(!user){
  //   setCurrentChat(null)

  // }
  useEffect(() => {
    const newSocket = io("http://localhost:3000")
    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
      setCurrentChat(null)
    }
  }, [user])
  
  //add online user
  useEffect(() => {
    if (socket == null) {
      return
    }
    console.log(user?._id)
    socket.emit("add new user", user?._id)
    socket.on("get online user",(res)=>{
        setOnlineUser(res)
    })
  }, [socket])
  
  //send new message
  useEffect(() => {
    if (socket == null) return

    const recipientID = currentChat?.participants?.find((id)=> id !==  user?._id)

    socket.emit("send message",{
      ...newMessage, recipientID
    })
  }, [newMessage])

  
  //receive message 
  useEffect(() => {
    if (socket === null) return
    
    socket.on("get message",res =>{
        if(currentChat?._id !== res.conversationId ) return
        setMessages((prev)=>[...prev,res])

    })
    return ()=>{ 
      socket.off("get message")
    }
  }, [socket,currentChat])

  console.log("Online user", onlineUser)

  const updateSearch = useCallback((info) => {
    setSearchTerm(info);
  }, []);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        setUserChatError(null);
        const response = await getRequest(
          `${baseUrl}/api/conversations/${user?._id}/chats`,
          null
        );
        if (response.error) {
          return setUserChatError(response);
        }
        setIsUserChatsLoading(false);

        setUserChat(response);
      }
    };
    getUserChats();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      setIsMessageLoading(true);
      setMessageError(null);
      const response = await getRequest(
        `${baseUrl}/api/messages/${currentChat?._id}/`,
        null
      );
      if (response.error) {
        return setMessageError(response);
      }
      setIsMessageLoading(false);

      setMessages(response);
    };
    getMessages();
  }, [currentChat]);
  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat)
  }, [])
    ;
  const sendMessage = useCallback(async (content, author, conversation, setTextMessage) => {
    if (!content) return console.log("Type sth")

    const response = await postRequest(`${baseUrl}/api/messages`,
      JSON.stringify({
        content: content,
        authorId: author._id,
        conversationId: conversation._id
      })
    )
    if (response.error) {
      return setSendTextMessageError(response)
    }
    setNewMessage(response)
    setMessages((prev) => [...prev, response])
    setTextMessage("")
  }, [])


  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatError,
        searchTerm,
        updateSearch,
        updateCurrentChat,
        messages,
        isMessageLoading,
        messageError,
        currentChat,
        sendMessage,
        onlineUser
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
