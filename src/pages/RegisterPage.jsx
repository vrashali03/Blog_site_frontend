import React, { useState } from "react";
import { BASE_URL } from "../Helper";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    //Validate name
    if (!name) {
      newErrors.name = "Please enter name!!";
    } else if (!/^[a-zA-Z ]*$/.test(name)) {
      newErrors.name =
        "Invalid Name!! Name can only contain letters and spaces.";
    }

    //Validate username
    if (!username) {
      newErrors.username = "Please enter uername!!";
    } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      newErrors.username =
        "Invalid Username! Username must be 3-20 characters and contain only letters, numbers, and underscores.";
    }

    //Validate password
    if (!password) {
      newErrors.password = "Please enter password!!";
    } else if (password.length <= 8) {
      newErrors.password =
        "Length of password is short. It must be more than 8 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function register(event) {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      body: JSON.stringify({ name, username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      alert("Registration Successfull");
    } else {
      alert("Registration failed!");
    }
  }
  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
      </div>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>
      <button>Register</button>
    </form>
  );
};

export default RegisterPage;
