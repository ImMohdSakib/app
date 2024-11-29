import React, { useState, useEffect, useRef } from "react";

const API_URL = "https://6749f9998680202966334a87.mockapi.io/hindi";

const App = () => {
  const [isVisible, setIsVisible] = useState(false); // Chat app visibility state
  const [tapCount, setTapCount] = useState(0); // Screen tap count state

  // Tap handler to track user taps
  const handleScreenTap = () => {
    setTapCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount === 3) {
        setIsVisible(true); // Show chat app after 3 taps
      }
      return newCount;
    });
  };

  if (!isVisible) {
    // Blank screen with tap counter
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={handleScreenTap}
      >
        {/* Add optional tap count display */}
        <span style={{ color: "white", fontSize: "20px" }}>
          {/* Taps: {tapCount} */}
        </span>
      </div>
    );
  }

  return <ChatApp />;
};

const ChatApp = () => {
  const [messages, setMessages] = useState([]); // Messages state
  const [newMessage, setNewMessage] = useState(""); // New message input
  const bottomRef = useRef(null); // Bottom scroll reference

  // API se messages fetch karne ka function
  const fetchMessages = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Component mount hone par aur har 30 seconds me data refresh karne ka setup
  useEffect(() => {
    fetchMessages(); // Initial fetch
    const interval = setInterval(fetchMessages, 2000); // 2 seconds ke baad refresh
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Message send karne ka function (POST request)
  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return; // Empty input check
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: newMessage }),
      });
      const data = await response.json();
      setMessages([...messages, data]); // Local state update karein
      setNewMessage(""); // Input clear karein
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Enter key press par message send karna
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  // Message delete karna (DELETE request)
  const handleDeleteMessage = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      const updatedMessages = messages.filter((message) => message.id !== id);
      setMessages(updatedMessages); // Local state update karein
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  // Scroll to bottom on messages update
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Application</h2>
      <div style={styles.chatBox}>
        {messages.map((message) => (
          <div key={message.id} style={styles.message}>
            {/* Message text */}
            <span style={styles.messageText}>{message.message}</span>
            {/* Delete button */}
            <button
              style={styles.deleteButton}
              onClick={() => handleDeleteMessage(message.id)}
            >
              Delete
            </button>
          </div>
        ))}
        {/* Invisible div for scroll reference */}
        <div ref={bottomRef}></div>
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress} // Enter key press handler
          placeholder="Type your message..."
          style={styles.input}
        />
        <button onClick={handleSendMessage} style={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

// CSS-in-JS styles
const styles = {
  container: {
    width: "400px",
    margin: "50px auto",
    fontFamily: "Arial, sans-serif",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  chatBox: {
    maxHeight: "300px",
    overflowY: "auto",
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  message: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#f9f9f9",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "5px",
  },
  messageText: {
    flex: 1,
    minWidth: 0,
    wordWrap: "break-word",
    overflowWrap: "break-word",
    whiteSpace: "pre-wrap",
    marginRight: "10px",
  },
  deleteButton: {
    background: "#ff4d4d",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  input: {
    flex: "1",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginRight: "10px",
  },
  sendButton: {
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "10px",
    cursor: "pointer",
  },
};

export default App;
