import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    const newMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user', // Assuming 'user' is the sender
    };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  // Simulated received message for demonstration
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === 'user') {
      setTimeout(() => {
        const receivedMessage = {
          id: messages.length + 1,
          text: 'This is a received message.',
          sender: 'receiver',
        };
        setMessages([...messages, receivedMessage]);
      }, 1000);
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === 'user' ? 'sent' : 'received'}`}
          >
            {message.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <form className="chat-input" onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
