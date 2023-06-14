import { useStoreForLoginPage } from "@/store/useStore";
import { useEffect } from "react";

export const useAuth = () => {
  const {
    loading,
    loggedIn,
    userId,
    userName,
    setLoading,
    setLoggedIn,
    setUserId,
    setUserName,
  } = useStoreForLoginPage();

  // This function is called when the user clicks the login button

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
      console.log(data);
      const {
        email: userEmail,
        password: userPassword,
        _id: userId,
        username: userName,
      } = data;
      if (!userEmail || !userPassword || !userId) {
        throw new Error("Invalid response from server");
      }
      localStorage.setItem("email", userEmail);
      localStorage.setItem("password", userPassword);
      localStorage.setItem("userId", userId); // Save the user ID to localStorage
      localStorage.setItem("userName", userName);
      setLoggedIn(true);
      setUserId(userId); // Set the user ID state
      setUserName(userName);
    } catch (error) {
      console.error(error);
    }
  };

  // This function is called when the user clicks the Create a User button

  const handleCreateUser = async (
    email: string,
    password: string,
    username: string,
    passwordCheck: string
  ) => {
    if (!email || !password || !username) {
      alert("Please provide an email, password and username");
      return;
    } else if (password !== passwordCheck) {
      alert("Passwords do not match");
      return;
    }

    const appKey = "qog3V4JyXXVkJX72vsdP"; // Provide your appKey here
    const url = "http://localhost:5000/user";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: appKey, // Include the appKey header
        },
        body: JSON.stringify({ email, password, username }),
      });

      if (response.status === 401) {
        throw new Error("Unauthorized"); // Throw an error if unauthorized
      }

      const data = await response.json();
      console.log(data);
      const {
        email: userEmail,
        password: userPassword,
        _id: userId,
        username: userName,
      } = data;
      if (!userEmail || !userPassword || !userId) {
        throw new Error("Invalid response from server");
      }
      localStorage.setItem("email", userEmail);
      localStorage.setItem("password", userPassword);
      localStorage.setItem("userId", userId); // Save the user ID to localStorage
      localStorage.setItem("userName", userName);
      setLoggedIn(true);
      setUserId(userId); // Set the user ID state
      setUserName(userName);
    } catch (error) {
      console.error(error);
    }
  };

  // This function is called when the user clicks the logout button

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("userId"); // Remove the user ID from localStorage
    localStorage.removeItem("userName");
    setLoggedIn(false);
    setUserId(""); // Reset the user ID state
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("userName");
    if (storedEmail && storedPassword && storedUserId) {
      setLoggedIn(true);
      setUserId(storedUserId);
      setUserName(storedUserName);
    }
    setLoading(false);
  }, []);

  return {
    loading,
    loggedIn,
    userId,
    userName,
    handleLogin,
    handleLogout,
    handleCreateUser,
  };
};
