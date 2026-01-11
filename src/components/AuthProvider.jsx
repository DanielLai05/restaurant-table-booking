import { useEffect, useState } from "react";
import { AuthContext } from "../context";
import { auth } from "../firebase";
import axios from "axios";
import { Spinner } from "react-bootstrap";

function FullPageSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner animation="grow" role="status" />
    </div>
  );
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      setUserDetails(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);

      if (user) {
        await fetchUser(user.uid);
      } else {
        setUserDetails(null);
      }

      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, userDetails, authLoading }}>
      {
        authLoading ? <FullPageSpinner /> : children
      }
    </AuthContext.Provider>
  )
}
