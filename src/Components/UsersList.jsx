import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function UsersList({ onSelectUser }) {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUserId(user.uid);
        const usersRef = collection(db, "users");
        const snapshot = await getDocs(usersRef);
        const usersList = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.uid !== user.uid) {
            usersList.push(data);
          }
        });

        setUsers(usersList);
      } else {
        setCurrentUserId(null);
        setUsers([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Ładowanie użytkowników...</p>;

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
