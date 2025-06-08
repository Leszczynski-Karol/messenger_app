import React, { useState } from "react";
import Login from "./Components/Login";
import UsersList from "./Components/UsersList";

function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
      <Login />
      {!selectedUser ? (
        <UsersList onSelectUser={setSelectedUser} />
      ) : (
        <div>
          <h2>Wybrano: {selectedUser.displayName}</h2>
          
          <button onClick={() => setSelectedUser(null)}>Wróć do listy</button>
        </div>
      )}
    </div>
  );
}

export default App;
