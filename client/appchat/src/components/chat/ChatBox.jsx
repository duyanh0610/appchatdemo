import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Button, Stack } from "react-bootstrap";
import moment from "moment"
import InputEmoji from "react-input-emoji"

const ChatBox = () => {
    const { user } = useContext(AuthContext)
    const { currentChat, messages, isMessageLoading, messageError, sendMessage } = useContext(ChatContext)
    const { recipientUser } = useFetchRecipientUser(currentChat, user)
    const [textMessage, setTextMessage] = useState("")
    const stackRef = useRef(null);

    useEffect(() => {
        if (stackRef.current) {
            stackRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }
    }, [messages]);
    if (!recipientUser) {
        return (
            <p style={{ textAlign: "center", width: "100%" }} >
                No conversation selected yet...
            </p>
        )
    }
    if (isMessageLoading) {
        return (
            <p style={{ textAlign: "center", width: "100%" }}>
                Loading...
            </p>
        )
    }
    else {
        return (
            <Stack gap={4} className="chat-box">
                <div className="chat-header">
                    <strong>{recipientUser?.username}</strong>
                </div>
                <Stack
                    gap={3}
                    className="messages"
                    style={{ overflowY: "auto", scrollBehavior: "smooth" }}

                >
                    {messages && messages.map((message, index) => {

                        return (
                            <Stack key={index}
                                className={`${message.authorId === user?._id ?
                                    "message self align-self-end flex-grow-0" :
                                    "message align-self-start flex-grow-0"
                                    }`}
                            >
                                <span>{message.content}</span>
                                <span className="message-footer">{moment(message.createdAt).calendar()}</span>

                            </Stack>
                        )
                    })}
                    <div ref={stackRef}></div>
                </Stack>
                <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
                    <InputEmoji
                        value={textMessage}
                        onChange={setTextMessage}
                        fontFamily="nunito"
                    />
                    <button className="send-btn" onClick={() => sendMessage(textMessage, user, currentChat, setTextMessage)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                        </svg>
                    </button>
                </Stack>
            </Stack>
        );
    }

}

export default ChatBox;