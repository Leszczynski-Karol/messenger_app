import React, { useState } from "react";
import Login from "./Components/Login";
import UsersList from "./Components/UsersList";
import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import Chat from "./Components/Chat";

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageValue, setMessageValue] = useState("");
  
  function sendMessage()
  {

  }
  return (
    <div>
      <Login />
      {!selectedUser ? (
        <UsersList onSelectUser={setSelectedUser} />
      ) : (
        <div>
          <h2>Wybrano: {selectedUser.displayName}</h2>
          {/* <div>
          <textarea placeholder="Napisz wiadomosc" value={messageValue} onChange={(e) => setMessageValue(e.target.value)}></textarea>
          <button onClick={sendMessage}>Wyslij</button>
          </div> */}
          <Chat selectedUser={selectedUser} />
          <button onClick={() => setSelectedUser(null)}>Wróć do listy</button>
        </div>
      )}
    </div>
  );
}

export default App;
