import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../firebase";

export default function Chat({ selectedUser }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const currentUserId = auth.currentUser?.uid;
  const chatId =
    currentUserId > selectedUser.uid
      ? `${selectedUser.uid}_${currentUserId}`
      : `${currentUserId}_${selectedUser.uid}`;

  useEffect(() => {
    const q = query(
      collection(db, "messages", chatId, "messages"),
      orderBy("timestamp")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      await addDoc(collection(db, "messages", chatId, "messages"), {
        senderId: currentUserId,
        receiverId: selectedUser.uid,
        text: message,
        timestamp: serverTimestamp(),
      });
      setMessage("");
    } catch (error) {
      console.error("Błąd przy wysyłaniu wiadomości:", error);
    }
  };

  return (
    <div>
      <h3>Rozmowa z: {selectedUser.displayName}</h3>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.senderId === currentUserId ? "message right" : "message left"
            }
          >
            <span className="message-bubble">{msg.text}</span>
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          value={message}
          placeholder="Napisz wiadomość..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Wyślij</button>
      </div>
    </div>
  );
}
