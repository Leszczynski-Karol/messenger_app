import { useEffect, useState } from "react";
import {
  auth,
  provider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  db,
  doc,
  getDoc,
  setDoc
} from "../firebase";

export default function Login() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      {user ? (
        <>
          <p>Zalogowany jako: {user.displayName}</p>
          <button onClick={handleLogout}>Wyloguj się</button>
        </>
      ) : (
        <button onClick={handleLogin}>Zaloguj się przez Google</button>
      )}
    </div>
  );
}
