import { useContext } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../../components/chat/UserChat";
import { AuthContext } from "../../contexts/AuthContext";
import ConversationSearch from "../../components/chat/ConversationSearch";

const Chat = () => {
    const {user} = useContext(AuthContext)
    const {userChats,isUserChatsLoading,userChatError} = useContext(ChatContext)
   
    return (
        <>
            
            <Container>
               { userChats?.length<1 
               ? <p>You have no conversations</p>
               : <Stack direction='horizontal' gap = {5} className ="align-item-end" >
                    <Stack className = "messages-box flex-grow-0 pe-3" gap ={3}>
                    <ConversationSearch/>
                        
                        {isUserChatsLoading && <p>Loading...</p>}
                         {userChats?.map((chat,index)=>{
                            return(
                                <div key ={index}>
                                    <UserChat chat={chat} user={user}/>
                                </div>
                            )
                         })}
                    </Stack>
                    <Stack>
                       <p>Chat Box</p>
                    </Stack>
               </Stack>  
               }
            </Container>
        </>
    );
}

export default Chat;