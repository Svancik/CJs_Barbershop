import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // use useNavigate hook here

  const handleLogin = () => {
    if (
      username === process.env.REACT_APP_USERNAME &&
      password === process.env.REACT_APP_PASSWORD
    ) {
      // Authentication successful
      localStorage.setItem("isLoggedIn", "true"); // Set the isLoggedIn flag in localStorage

      navigate("/admin"); // Redirect to the admin page
    } else {
      alert("Invalid credentials!");
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh", // Full view height
      backgroundColor: "#f7f7f7",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      width: "300px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      borderRadius: "8px",
      backgroundColor: "white",
    },
    input: {
      marginBottom: "10px",
      padding: "10px",
      fontSize: "16px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    button: {
      padding: "10px",
      color: "white",
      backgroundColor: "#007BFF",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.2s",
      "&:hover": {
        backgroundColor: "#0056b3",
      },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Uživatelské jméno"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Heslo"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>
          Přihlásit se
        </button>
      </div>
    </div>
  );
};

export default Login;
