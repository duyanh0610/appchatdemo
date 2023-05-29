import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import avatar from "../../assests/avatar.svg"
import { useContext } from "react";
import { ChatContext } from "../../contexts/ChatContext";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const {onlineUser} = useContext(ChatContext)

  const isOnline = onlineUser?.some((user)=> user?.userId === recipientUser?._id)
  return (
    <>
      <Stack
        direction="horizontal"
        gap={3}
        className="user-card align-item-center p-2 m-2 justify-content-between"
        role ="button"
        
      >
        <div className="d-flex">
          <div className="me-2">
            <img src={avatar} height="35px" />
          </div>
          <div className="text-content">
            <div className="groupName">{chat.name}</div>
            <div className="name">To:{recipientUser?.username}</div>
            <div className="text">Text message</div>
          </div>
        </div>
        <div className="d-flex flex-column align-items-end">
        <div className="date">12/12/2022
          {
            isOnline &&
           <span className="user-online"></span>

          }
          </div>
          <div className="this-user-notifications">2</div>
          
        </div>
      </Stack>
    </>
  );
};

export default UserChat;
<></>;
