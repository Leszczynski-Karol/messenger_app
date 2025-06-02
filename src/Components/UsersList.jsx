import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function UsersList({ onSelectUser }) {
  const [users, setUsers] = useState([]);
  const currentUserId = auth.currentUser?.uid;

  useEffect(() => {
    async function fetchUsers() {
      const usersRef = collection(db, "users");
      const querySnapshot = await getDocs(usersRef);
      const usersList = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.uid !== currentUserId) {  // filtrujemy aktualnego użytkownika
          usersList.push(data);
        }
      });
      setUsers(usersList);
    }

    if (currentUserId) {
      fetchUsers();
    }
  }, [currentUserId]);

  if (!currentUserId) {
    return <p>Zaloguj się, aby zobaczyć listę użytkowników.</p>;
  }

  return (
    <div>
      <h2>Wybierz osobę do rozmowy:</h2>
      <ul>
        {users.length === 0 && <li>Brak innych użytkowników</li>}
        {users.map((user) => (
          <li
            key={user.uid}
            style={{ cursor: "pointer", marginBottom: "10px" }}
            onClick={() => onSelectUser(user)}
          >
            <img
              src={user.photoURL}
              alt={user.displayName}
              width={30}
              height={30}
              style={{ borderRadius: "50%", marginRight: "10px" }}
            />
            {user.displayName}
          </li>
        ))}
      </ul>
    </div>
  );
}
