import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { login, selectUser } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Cookies from "js-cookie";
const Nav = () => {
  const user = useSelector(selectUser);
  let history = useHistory();
  const dispatch = useDispatch();
  const logout = async () => {
    await axios
      .post("logout")
      .then(function (response) {
        Cookies.remove("token");
        dispatch(login({ user: null }));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  let menu;
  if (user !== null) {
    menu = (
      <div className="col-md-3 text-end">
        <Link to={"/rankings"} className="btn btn-outline-primary me-2">
          Rankings
        </Link>
        <Link to={"/stats"} className="btn btn-outline-primary me-2">
          Stats
        </Link>
        <Link to={"/profile"} className="btn btn-outline-primary me-2">
          {user.user.first_name}
        </Link>
        <Link onClick={logout} className="btn btn-outline-primary me-2">
          Loguot
        </Link>
      </div>
    );
  } else {
    menu = (
      <div className="col-md-3 text-end">
        <a className="btn btn-outline-primary me-2" href="/register">
          register
        </a>
        <a className="btn btn-outline-primary me-2" href="/login">
          Login
        </a>
      </div>
    );
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
      <div className="container">
        <div className="container" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="/" className="nav-link">
                frontend
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/backend">
                Backend
              </a>
            </li>
          </ul>
        </div>
        {menu}
      </div>
    </nav>
  );
};

export default Nav;
