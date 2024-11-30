import React, { useState, useRef, useEffect } from "react";

const API_URL = "https://6749f9998680202966334a87.mockapi.io/hindi";

const App = () => {
  const [isVisible, setIsVisible] = useState(false); // Chat app visibility state
  const [cardClicks, setCardClicks] = useState({}); // Clicks per card

  const handleCardClick = (cardId) => {
    setCardClicks((prevClicks) => {
      const newClicks = { ...prevClicks, [cardId]: (prevClicks[cardId] || 0) + 1 };
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
      "भारत में 14 सितंबर को हिंदी दिवस मनाया जाता है।",
      "हिंदी को 1950 में भारत की आधिकारिक भाषा बनाया गया।",
      "हिंदी का नाम संस्कृत शब्द 'हिन्द' से लिया गया है।",
      "हिंदी में पहला उपन्यास 'परीक्षा गुरु' 1882 में लिखा गया।",
      "देवनागरी लिपि में लिखी जाती है हिंदी।",
      "हिंदी का पहला शब्दकोश 1875 में तैयार किया गया।",
      "हिंदी के लेखक मुंशी प्रेमचंद को 'उपन्यास सम्राट' कहा जाता है।",
      "विश्व हिंदी दिवस हर साल 10 जनवरी को मनाया जाता है।",
      "भारतीय संविधान 26 जनवरी 1950 को लागू किया गया।",  
"स्वतंत्रता संग्राम के दौरान 1942 में 'भारत छोड़ो आंदोलन' शुरू किया गया।",  
"अशोक महान ने अपने राज्य के दौरान बौद्ध धर्म को बढ़ावा दिया।",  
"महात्मा गांधी ने 1915 में दक्षिण अफ्रीका से भारत लौटने के बाद स्वतंत्रता संग्राम का नेतृत्व किया।",  
"1857 का विद्रोह भारत का पहला स्वतंत्रता संग्राम माना जाता है।",  
"हड़प्पा सभ्यता को सिंधु घाटी सभ्यता भी कहा जाता है।",  
"आल्हा-ऊदल महोबा के वीर योद्धा थे, जिनकी कहानियां आज भी प्रसिद्ध हैं।",  
"ताजमहल का निर्माण 1632 में शुरू हुआ और 1653 में पूरा हुआ।",  
"चाणक्य ने मौर्य साम्राज्य की स्थापना में चंद्रगुप्त मौर्य की मदद की।",  
"स्वामी विवेकानंद ने 1893 में शिकागो में धर्म संसद को संबोधित किया।",  
"आधुनिक कंप्यूटर के जनक चार्ल्स बैबेज माने जाते हैं।",  
"भारत का पहला उपग्रह 'आर्यभट्ट' 1975 में लॉन्च किया गया।",  
"ग्रेगोरी मेंडेल को 'आधुनिक आनुवंशिकी का जनक' कहा जाता है।",  
"सर सी.वी. रमन को भौतिकी में उनके 'रमन प्रभाव' के लिए नोबेल पुरस्कार मिला।",  
"न्यूटन ने 1687 में गुरुत्वाकर्षण का सिद्धांत प्रस्तुत किया।",  
"पहला कृत्रिम उपग्रह 'स्पुतनिक-1' 1957 में सोवियत संघ ने लॉन्च किया।",  
"डीएनए की संरचना की खोज वाटसन और क्रिक ने 1953 में की।",  
"पृथ्वी के चारों ओर चक्कर लगाने वाला अंतरिक्ष यात्री पहला व्यक्ति यूरी गागरिन था।",  
"एलेसेंड्रो वोल्टा ने बैटरी का आविष्कार किया।",  
"भारत ने 2014 में मंगल ग्रह पर अपना पहला मिशन 'मंगलयान' सफलतापूर्वक लॉन्च किया।",  
"भारत में सबसे बड़ा त्योहार दीपावली है।",  
"योग की उत्पत्ति भारत में हुई और इसे पतंजलि ने व्यवस्थित किया।",  
"अजंता और एलोरा की गुफाएं भारत की प्राचीन कलाओं का उदाहरण हैं।",  
"संगीत के सात सुरों की उत्पत्ति भारत से मानी जाती है।",  
"भरतनाट्यम भारत के सबसे पुराने शास्त्रीय नृत्य रूपों में से एक है।",  
"भारत में 22 आधिकारिक भाषाएं हैं।",  
"महाकाव्य 'रामायण' और 'महाभारत' भारतीय संस्कृति का आधार हैं।",  
"कुंभ मेला हर 12 साल में आयोजित किया जाता है।",  
"भारत के राष्ट्रीय पशु बाघ और राष्ट्रीय पक्षी मोर हैं।",  
"हिंदू धर्म में गाय को पवित्र माना जाता है।",  

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

  return <ChatApp />;
};

const ChatApp = () => {
  const [messages, setMessages] = useState([]); // Messages state
  const [newMessage, setNewMessage] = useState(""); // New message input
  const bottomRef = useRef(null); // Bottom scroll reference
  const messageClicks = useRef({}); // Click count per message

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

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: newMessage }),
      });
      const data = await response.json();
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleMessageClick = async (messageId) => {
    messageClicks.current[messageId] = (messageClicks.current[messageId] || 0) + 1;

    if (messageClicks.current[messageId] === 5) {
      try {
        await fetch(`${API_URL}/${messageId}`, { method: "DELETE" });
        setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageId));
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

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Send Any Fact</h2>
      <div style={styles.chatBox}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={styles.message}
            onClick={() => handleMessageClick(message.id)} // Add click functionality
          >
            <span style={styles.messageText}>{message.message}</span>
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
    background: "#f9f9f9",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "5px",
    cursor: "pointer",
  },
  messageText: {
    flex: 1,
    wordWrap: "break-word",
    whiteSpace: "pre-wrap",
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
