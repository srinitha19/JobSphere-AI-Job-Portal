import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !user.name ||
      !user.email ||
      !user.password ||
      !user.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));

    alert("Signup Successful");

    navigate("/login");
  };

  return (
    <div className="auth-container">

      <form className="auth-form" onSubmit={handleSubmit}>

        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={user.name}
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={handleChange}
        />

        <button>Create Account</button>

        <p>
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </form>

    </div>
  );
}

export default Signup;