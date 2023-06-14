import { useState, useEffect } from "react";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) {
      alert("Please provide an email and password");
      return;
    }
    const appKey = "qog3V4JyXXVkJX72vsdP"; // Provide your appKey here
    const url = "http://localhost:5000/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: appKey, // Include the appKey header
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 401) {
        throw new Error("Unauthorized"); // Throw an error if unauthorized
      }

      const data = await response.json();
      const { email: userEmail, password: userPassword, _id: userId } = data;
      localStorage.setItem("email", userEmail);
      localStorage.setItem("password", userPassword);
      localStorage.setItem("userId", userId); // Save the user ID to localStorage
      setLoggedIn(true);
      setUserId(userId); // Set the user ID state
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("userId"); // Remove the user ID from localStorage
    setLoggedIn(false);
    setUserId(""); // Reset the user ID state
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    const storedUserId = localStorage.getItem("userId");
    if (storedEmail && storedPassword && storedUserId) {
      setLoggedIn(true);
      setUserId(storedUserId);
    }
    setLoading(false);
  }, []);

  return { loading, loggedIn, userId, handleLogin, handleLogout };
};
