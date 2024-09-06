import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../helpers/http-client";
// import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await baseURL.post(
        "/register",
        {
          username,
          email,
          password,
          // role,
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        //   },
        // }
      );
      console.log(data.data, "<<< handleRegister");
      navigate("/login");
    } catch (err) {
      navigate("/login");
      console.error(err, "<<< err handleRegister");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center full-height">
      <div className="card" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="card-header">Register</h3>
        <div className="card-body">
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
