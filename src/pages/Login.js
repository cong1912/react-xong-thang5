import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import "./Login.css";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
const Login = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
 
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        Cookies.set("token", response.data.token, { expires: 365 });
        
        history.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <main className="form-signin ">
        <form>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>

          <button
            className="w-100 btn btn-lg btn-primary"
            onClick={handleSubmit}
          >
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
        </form>
      </main>
    </div>
  );
};

export default Login;
