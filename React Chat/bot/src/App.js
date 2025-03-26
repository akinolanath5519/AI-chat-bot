import React, { useState } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages([...messages, newMessage]); // Update chat with user message
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();

      if (data.message && Array.isArray(data.message)) {
        // Extract text from message objects
        const botMessage = data.message.map(msg => msg.text).join(" ");
        setMessages((prev) => [...prev, { role: "bot", content: botMessage }]);
      }
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [...prev, { role: "bot", content: "Oops! Something went wrong." }]);
    }

    setLoading(false);
  };

  return (
    <>
      {isOpen && (
        <div className="chatbot-widget">
          <div className="chatbot-header">
            <div className="chatbot-title">AI Assistant</div>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="chatbot-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            {loading && <div className="loading">Thinking...</div>}
          </div>

          <div className="chat-input-container">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              rows="1"
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}

      <button className="chat-launcher" onClick={() => setIsOpen(!isOpen)}>
        💬
      </button>

      <style>
        {`
          .chatbot-widget {
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 320px;
            background: white;
            box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
            border-radius: 12px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }

          .chatbot-header {
            background: #6a1b9a;
            color: white;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .chatbot-body {
            max-height: 300px;
            overflow-y: auto;
            padding: 10px;
          }

          .chat-message {
            padding: 8px;
            margin: 5px 0;
            border-radius: 8px;
            max-width: 80%;
          }

          .chat-message.user {
            background: #e1bee7;
            align-self: flex-end;
          }

          .chat-message.bot {
            background: #f3f3f3;
            align-self: flex-start;
          }

          .chat-input-container {
            display: flex;
            padding: 10px;
            border-top: 1px solid #ddd;
          }

          .chat-input-container textarea {
            flex-grow: 1;
            padding: 8px;
            border: none;
            border-radius: 5px;
            resize: none;
          }

          .chat-input-container button {
            background: #6a1b9a;
            color: white;
            border: none;
            padding: 8px 15px;
            margin-left: 5px;
            border-radius: 5px;
            cursor: pointer;
          }

          .chat-launcher {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #6a1b9a;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
};

export default Chatbot;
