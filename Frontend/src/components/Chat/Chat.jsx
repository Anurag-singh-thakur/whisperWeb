import React, { useEffect, useState } from 'react';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');




  return (
    <div className="chat-page">
      <h1>Chat</h1>
      <div className="messages">
          <div ></div>
      
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button>Send</button>
    </div>
  );
};

export default ChatPage;