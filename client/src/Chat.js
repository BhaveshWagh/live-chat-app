import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const handleSendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        user: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
      console.log(data);
    });
  }, [socket]);

  return (
    <div className="w-80 h-9 m-auto">
      <div className=" text-center text-2xl bg-sky-300 p-2 font-bold mt-10 mb-1 rounded-lg">
        <p>Live Chat</p>
      </div>
      <div className=" h-96 bg-white relative border border-black rounded-lg mb-2">
        <ScrollToBottom className=" flex w-full h-full items-center overflow-x-hidden overflow-y-scroll no-scrollbar">
          {messageList.map((messageContent, index) => {
            return (
              <div
                className={` flex ${
                  username === messageContent.user
                    ? " justify-end "
                    : "justify-start"
                }`}
                key={index}
              >
                <div
                  className={`flex flex-col  rounded-lg m-1 px-3 py-1 ${
                    username === messageContent.user
                      ? " bg-green-200"
                      : "bg-sky-300"
                  }`}
                >
                  <div className="">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className=" flex gap-1 text-sm">
                    <p className="text-sm" id="time">
                      {messageContent.time}
                    </p>
                    <p className="font-semibold text-sm" id="author">
                      {messageContent.user}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="h-10 rounded-lg flex justify-center">
        <input
          className="border border-sky-500 p-2 w-80 mr-2 rounded-lg"
          type="text"
          value={currentMessage}
          placeholder="hi..."
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          className="bg-sky-400 w-10 text-2xl hover:bg-sky-300 rounded-lg"
          onClick={handleSendMessage}
        >
          &#9658;
        </button>
      </div>
    </div>
  );
};

export default Chat;
