import React, { useState, useEffect, useRef } from "react";

const API_URL = "https://6749f9998680202966334a87.mockapi.io/hindi";

const App = () => {
  const [isVisible, setIsVisible] = useState(false); // Chat app visibility state
  const [cardClicks, setCardClicks] = useState({}); // Clicks per card
  const [keyboardOpen, setKeyboardOpen] = useState(false); // Detect keyboard state

  useEffect(() => {
    const adjustForKeyboard = () => {
      if (window.innerHeight < window.outerHeight) {
        setKeyboardOpen(true);
      } else {
        setKeyboardOpen(false);
      }
    };

    // Add event listener for keyboard detection
    window.addEventListener("resize", adjustForKeyboard);

    return () => {
      window.removeEventListener("resize", adjustForKeyboard);
    };
  }, []);

  const handleCardClick = (cardId) => {
    setCardClicks((prevClicks) => {
      const newClicks = {
        ...prevClicks,
        [cardId]: (prevClicks[cardId] || 0) + 1,
      };
      if (newClicks[cardId] === 3) {
        setIsVisible(true); // Open chat app after 3 clicks on any card
      }
      return newClicks;
    });
  };

  if (!isVisible) {
    const facts = [
      "हिंदी विश्व की तीसरी सबसे ज्यादा बोले जाने वाली भाषा है।",
      "हिंदी में पहला अखबार 'उदंत मार्तंड' 1826 में प्रकाशित हुआ।",
    ];

    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        {facts.map((fact, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(index)}
            style={{
              width: "500px",
              height: "100px",
              margin: "10px",
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
            }}
          >
            {fact}
          </div>
        ))}
      </div>
    );
  }

  return <ChatApp keyboardOpen={keyboardOpen} />;
};

const ChatApp = ({ keyboardOpen }) => {
  const [messages, setMessages] = useState([]); // Messages state
  const [newMessage, setNewMessage] = useState(""); // New message input
  const bottomRef = useRef(null); // Bottom scroll reference
  const messageClicks = useRef({}); // Click count per message
  const [screenshotAlert, setScreenshotAlert] = useState(false); // Screenshot alert state

  const fetchMessages = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      // Scroll to the bottom only when a new message is added
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const detectScreenshot = () => {
      setScreenshotAlert(true);
      setTimeout(() => setScreenshotAlert(false), 3000); // Hide alert after 3 seconds
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const previousWidth = window.innerWidth;
        const previousHeight = window.innerHeight;

        setTimeout(() => {
          if (
            window.innerWidth !== previousWidth ||
            window.innerHeight !== previousHeight
          ) {
            detectScreenshot();
          }
        }, 500);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const timestamp = new Date().toLocaleTimeString(); // Current time

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: newMessage, timestamp }), // Add timestamp
      });

      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, data]); // Append new message
      setNewMessage(""); // Clear input field
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleMessageClick = async (messageId) => {
    messageClicks.current[messageId] =
      (messageClicks.current[messageId] || 0) + 1;

    if (messageClicks.current[messageId] === 5) {
      try {
        await fetch(`${API_URL}/${messageId}`, { method: "DELETE" });
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.id !== messageId)
        );
        delete messageClicks.current[messageId]; // Reset count after deletion
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleRefresh = () => {
    window.location.reload(); // Refresh the page
  };

  return (
    <div
      style={{
        ...styles.container,
        height: keyboardOpen ? "calc(100vh - 50px)" : "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      {screenshotAlert && (
        <div style={styles.screenshotAlert}>
          Screenshot detected!
        </div>
      )}
      <h2 style={styles.heading}>Send Any Fact</h2>
      <button onClick={handleRefresh} style={styles.refreshButton}>
        Back
      </button>
      <div style={styles.chatBox}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={styles.message}
            onClick={() => handleMessageClick(message.id)}
          >
            <span style={styles.messageText}>{message.message}</span>
            <div style={styles.timestamp}>
              {message.timestamp ? message.timestamp : "Just now"}
            </div>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          style={styles.input}
          autoFocus
        />
        <button onClick={handleSendMessage} style={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
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
  refreshButton: {
    display: "block",
    margin: "10px auto",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    cursor: "pointer",
  },
  chatBox: {
    maxHeight: "200px",
    overflowY: "auto",
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  message: {
    background: "#f9f9f9",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "5px",
    cursor: "pointer",
  },
  messageText: {
    fontSize: "14px",
    color: "#333",
  },
  timestamp: {
    fontSize: "12px",
    color: "#666",
    textAlign: "right",
    marginTop: "5px",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "10px",
  },
  sendButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    cursor: "pointer",
  },
  screenshotAlert: {
    backgroundColor: "#ffc107",
    color: "#fff",
    padding: "10px",
    textAlign: "center",
    borderRadius: "5px",
    marginBottom: "10px",
  },
};

export default App;
