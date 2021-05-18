import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import "./Login.css";
const Register = () => {
  const [first_name, setFist_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  let history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("register", {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        password_confirm: passwordConfirm,
      })
      .then(function (response) {
        history.push("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <main className="form-signin ">
      <form>
        <h1 className="h3 mb-3 fw-normal">Please register </h1>

        <div className="form-floating">
          <input
            className="form-control"
            placeholder="first_name"
            onChange={(e) => setFist_name(e.target.value)}
          />
          <label>first name</label>
        </div>

        <div className="form-floating">
          <input
            className="form-control"
            onChange={(e) => setLast_name(e.target.value)}
            placeholder="last_name"
          />
          <label>last name</label>
        </div>

        <div className="form-floating">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="name@example.com"
          />
          <label>email</label>
        </div>

        <div className="form-floating">
          <input
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <label>password</label>
        </div>
        <div className="form-floating">
          <input
            className="form-control"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="Password confirm"
          />
          <label>password confirm</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary" onClick={handleSubmit}>
          Submit
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
      </form>
    </main>
  );
};

export default Register;
