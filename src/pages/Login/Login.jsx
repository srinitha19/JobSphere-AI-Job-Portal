import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please Signup First");
      return;
    }

    if (
      login.email === user.email &&
      login.password === user.password
    ) {

      localStorage.setItem("isLoggedIn", true);

      alert("Login Successful");

      navigate("/profile");

    } else {

      alert("Invalid Email or Password");

    }

  };

  return (

    <div className="auth-container">

      <form className="auth-form" onSubmit={handleSubmit}>

        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />

        <button>Login</button>

        <p>

          Don't have an account?

          <Link to="/signup"> Signup</Link>

        </p>

      </form>

    </div>

  );
}

export default Login;