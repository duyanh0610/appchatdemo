import { createContext, useCallback, useEffect, useState } from "react";
import { getRequest, baseUrl, postRequest } from "../utils/Service";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChat] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatError, setUserChatError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const updateSearch = useCallback((info) => {
    setSearchTerm(info);
  }, []);
  console.log(searchTerm);

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

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatError,
        searchTerm,
        updateSearch,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
