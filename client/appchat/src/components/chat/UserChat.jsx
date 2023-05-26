import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";

const UserChat = ({chat,user}) => {
    const {recipientUser} = useFetchRecipientUser(chat,user)
    console.log(recipientUser)
    return (
        <>
         <Stack direction="horizontal" gap={3} className="user-card align-item-center p-2">
            <div className="me-2">
                A 
            </div>
            <div className="text-content">

            </div>
         </Stack>
        </>
      );
}
 
export default UserChat;
<>
    
</>