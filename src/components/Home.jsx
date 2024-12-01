import React, { useState, useEffect, useRef } from "react";
import { FiSend } from "react-icons/fi"; 
import img from "../assets/image1.png"


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

  return <ChatApp keyboardOpen={keyboardOpen} />;
};

const ChatApp = ({ keyboardOpen }) => {
  const [messages, setMessages] = useState([]); // Messages state
  const [newMessage, setNewMessage] = useState(""); // New message input
  const [image, setImage] = useState(null); // Image state
  const [isUploadingImage, setIsUploadingImage] = useState(false); // Image upload state
  const [enlargedImage, setEnlargedImage] = useState(null); // Enlarged image state
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

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const uploadImage = async (file) => {
    setIsUploadingImage(true); // Set image uploading state to true
    const formData = new FormData();
    formData.append("image", file); // ImgBB requires "image" key instead of "file"
  
    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=23e041dd9d19ab458f05bdef91500150",
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
  
      const data = await response.json();
      setIsUploadingImage(false); // Set image uploading state to false once done
      return data.data.url; // Ensure correct URL is returned
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsUploadingImage(false); // Set image uploading state to false on error
      return null;
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" && !image) return;

    let imageUrl = null;
    if (image) {
      imageUrl = await uploadImage(image);
    }

    const timestamp = new Date().toLocaleTimeString();

    const messageData = {
      message: newMessage,
      timestamp,
      image: imageUrl,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, data]);
      setNewMessage(""); // Reset message input
      setImage(null); // Reset image state
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
        delete messageClicks.current[messageId];
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
    window.location.reload();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setNewMessage(file.name); // Update input with image file name
    }
  };

  const handleImageClick = (imageUrl) => {
    setEnlargedImage(imageUrl); // Set the image as enlarged
  };

  const handleCloseImage = () => {
    setEnlargedImage(null); // Close the enlarged image
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
            {message.image && (
              <img
                src={message.image}
                alt="Uploaded"
                style={{ maxWidth: "100%", marginTop: "10px", cursor: "pointer" }}
                onClick={() => handleImageClick(message.image)} // Trigger image enlargement
              />
            )}
            <div style={styles.timestamp}>
              {message.timestamp ? message.timestamp : "Just now"}
            </div>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>
      <div style={styles.inputContainer}>
        {/* Image icon before input */}
        <button
          onClick={() => document.getElementById("fileInput").click()}
          style={styles.logoButton}
        >
          {/* <CiImageOn /> */}
          <img style={styles.logoButton} src={img} alt="" />
        </button>
        {/* Input box */}
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          style={styles.input}
          autoFocus
        />
        {/* Send icon button after input */}
        <button onClick={handleSendMessage} style={styles.sendButton}>
          <FiSend />
        </button>
      </div>
      {/* Hidden file input for image upload */}
      <input
        id="fileInput"
        type="file"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleImageChange}
      />
     {isUploadingImage && (
  <div style={styles.modal}>
    <div style={styles.modalContent}>
      <p>Image Sending...</p>
    </div>
  </div>
)}


      {/* Enlarged image modal */}
      {enlargedImage && (
        <div style={styles.modal} onClick={handleCloseImage}>
          <img
            src={enlargedImage}
            alt="Enlarged"
            style={styles.enlargedImage}
          />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "0 20px",
    backgroundColor: "#fff",
    // borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
    position: "absolute",
    bottom: "40px",
    // right: "20px",
    zIndex: 1000,
  },
  heading: {
    fontSize: "18px",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  refreshButton: {
    backgroundColor: "",
    border: "1px solid #ddd",
    padding: "5px",
    cursor: "pointer",
    height: "40px",
    width: "60px",
    marginBottom: "10px",
    borderRadius:"5px"
  },
  chatBox: {
    overflowY: "auto",
    maxHeight: "240px",
    marginBottom: "10px",
    border:"1px solid rgb(228, 228, 228)",
    padding: "0 10px",
    backgroundColor: "rgb(245, 245, 245)",
    borderRadius: "10px",
  },
  message: {
    backgroundColor: "#e0e0e0",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "10px",
    
  },
  messageText: {
    display: "block",
  },
  timestamp: {
    fontSize: "12px",
    color: "#888",
    marginTop: "5px",
    marginLeft: "78%",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  logoButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "none",
    // border: "1px solid",
    cursor: "pointer",
    fontSize : "24px",
    height:"40px",
    width:"40px",
    objectFit: "cover",
    marginRight:"3px",
    border:"none"
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "20px",
    border: "1px solid #ddd",
    marginRight: "10px",
    fontSize: "16px",
    width: "100%",
  },
  sendButton: {
    backgroundColor: "#0b87f1",
    border: "none",
    color: "white",
    padding: "10px",
    borderRadius: "50%",
    cursor: "pointer",
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
    zIndex: 1000, // To make sure the modal appears on top
  },
  modalContent: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
  },
  enlargedImage: {
    maxWidth: "90%",
    maxHeight: "90%",
    objectFit: "contain",
  },
};

export default App;
