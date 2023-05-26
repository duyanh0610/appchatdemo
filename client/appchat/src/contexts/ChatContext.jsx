import { createContext, useEffect, useState } from "react";
import { getRequest,baseUrl,postRequest } from "../utils/Service";

export const ChatContext = createContext()

export const ChatContextProvider=({children,user}) => {
    const [userChats,setUserChat] = useState(null)
    const [isUserChatsLoading,setIsUserChatsLoading] = useState(false)
    const [userChatError,setUserChatError] = useState(null)
    
    useEffect(()=>{
        const  getUserChats = async()=>{
            if(user?._id){
                setIsUserChatsLoading(true)
                setUserChatError(null) 
                const response = await getRequest(`${baseUrl}/api/conversations/${user?._id}/chats`, null)
                if(response.error){
                    return setUserChatError(error) 
                }
                setIsUserChatsLoading(false)

                setUserChat(response)
            }
        }
        getUserChats()
    },[user])

    return(
        <ChatContext.Provider 
            value= {{userChats,isUserChatsLoading,userChatError}} >
            {children}
        </ChatContext.Provider>
    )

}