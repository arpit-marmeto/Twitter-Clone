import { useState } from "react";

const conversations = [
  { id: 1, name: "John Doe", lastMessage: "Hey, how's it going?", messages: ["Hey!", "How are you?", "Let's catch up soon!"] },
  { id: 2, name: "Alice Smith", lastMessage: "Check this out!", messages: ["Did you see this?", "It's amazing!"] },
  { id: 3, name: "Bob Johnson", lastMessage: "Meeting at 3 PM", messages: ["Don't forget about the meeting.", "See you then!"] },
];

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="flex h-screen">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-300 dark:border-gray-700 p-4 bg-white dark:bg-black">
        <h2 className="text-xl font-bold mb-4">Messages</h2>
        <ul>
          {conversations.map((chat) => (
            <li
              key={chat.id}
              className="p-3 border-b cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
              onClick={() => setSelectedChat(chat)}
            >
              <p className="font-semibold">{chat.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{chat.lastMessage}</p>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Chat Window */}
      <div className="w-2/3 p-4 bg-white dark:bg-black flex flex-col">
        {selectedChat ? (
          <>
            <h2 className="text-xl font-bold border-b pb-2 mb-4">{selectedChat.name}</h2>
            <div className="flex flex-col space-y-2 flex-grow overflow-y-auto">
              {selectedChat.messages.map((msg, index) => (
                <p
                  key={index}
                  className="p-2 bg-gray-200 dark:bg-gray-800 rounded-lg max-w-xs"
                >
                  {msg}
                </p>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center mt-10">
            Select a conversation to start chatting
          </p>
        )}
      </div>
    </div>
  );
};

export default Messages;
