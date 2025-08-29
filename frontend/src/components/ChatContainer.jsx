import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore"
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { X } from "lucide-react";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const { messages, getMessages, isMessageLoading, selectedUser } = useChatStore();
  const { authUser } = useAuthStore();
  const [selectedImage, setselectedImage] = useState(null);
  const imageRef = useRef();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages])

  if (isMessageLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    )
  }

  const closeImage = (e) => {
    if(e.target !== imageRef.current){
      setselectedImage(null);
    }
  }
  return (
    <div className=" flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className=" flex-1 overflow-y-auto p-4 space-y-4">
        {
          messages.map((message) => (
            <div
              key={message._id}
              className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'}`}
            >
              <div className="chat-image avatar">
                <div className=" size-10 rounded-full border">
                  <img src={message.senderId === authUser._id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"}
                    alt="" />
                </div>
              </div>

              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              <div className="chat-bubble flex flex-col max-w-fit">
                {message.image && <img
                  src={message.image}
                  alt="attachment"
                  className=" sm:max-w-[240px] rounded-md mb-2 cursor-pointer"
                  onClick={() => setselectedImage(message.image)}
                />}
                {message.text && <p className=" sm:max-w-[240px] break-words">{message.text}</p>}
              </div>
            </div>
          ))
        }
      </div>
      <MessageInput />

      {selectedImage && <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={closeImage}>
        <button
          className="absolute top-4 right-4 text-white p-2 bg-black/50 rounded-full hover:bg-black"
          onClick={() => setselectedImage(null)}
        >
          <X size={24} />
        </button>

        <img
          ref={imageRef}
          className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
          src={selectedImage}
        />
      </div>}
    </div>
  )
}

export default ChatContainer
