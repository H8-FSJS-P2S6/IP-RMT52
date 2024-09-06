import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../helpers/http-client";

function Login() {
  const [email, setEmail] = useState("admin@mail.com");
  const [password, setPassword] = useState("admin1234");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await baseURL.post("/login", {
        email,
        password,
      });
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("userId", response.data.userId);
      console.log(response.data, "<<< handleLogin");
      navigate("/");
    } catch (err) {
      console.log(err, "<<< handleLogin");
    }
  };

  function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
  }
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: googleClientId,
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      {
        theme: "outline",
        size: "large",
      }
    );
    // google.accounts.id.prompt();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center full-height">
      <div className="card" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="card-header">Login</h3>
        <div className="card-body">
          <form onSubmit={handleLogin}>
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
          <div className="d-flex justify-content-center mt-3">
            <button
              type="button"
              className="btn btn-secondary btn-block"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <div id="buttonDiv"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
