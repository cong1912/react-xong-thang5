import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

const Profile = () => {
  const [first_name, setFist_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPassword_confirm] = useState("");
  useEffect(() => {
    const result = axios
      .get(`user`)
      .then((result) => {
        setFist_name(result.data.first_name);
        setLast_name(result.data.last_name);
        setEmail(result.data.email);
      })
      .catch(function (error) {});
  }, []);
  const infoSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put("users/info", {
        first_name,
        last_name,
        email,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const passwordSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put("users/password", {
        password,
        password_confirm,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Layout>
      <h3>Account infomation</h3>
      <form>
        <div className="mb-3">
          <input
            onChange={(e) => setFist_name(e.target.value)}
            label="First name"
            value={first_name}
          />
        </div>
        <div className="mb-3">
          <input
            onChange={(e) => setLast_name(e.target.value)}
            label="Last name"
            value={last_name}
          />
        </div>
        <div className="mb-3">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
          />
        </div>
        <button variant="contained" color="primary" onClick={infoSubmit}>
          Submit
        </button>
      </form>

      <h3>Change Password</h3>
      <form>
        <div className="mb-3">
          <input
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <div className="mb-3">
          <input
            label="Password confirm"
            onChange={(e) => setPassword_confirm(e.target.value)}
            type="password"
          />
        </div>

        <button variant="contained" color="primary" onClick={passwordSubmit}>
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default Profile;
