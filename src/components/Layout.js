import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import Header from "./Header";
import Nav from "./Nav";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
const Layout = (props) => {
  const location = useLocation();
  let header;
  if (location.pathname === "/" || location.pathname === "/backend") {
    header = <Header />;
  }
  return (
    <div>
      <div>
        <Nav />
        <main>
          {header}

          <div class="album py-5 bg-light">
            <div class="container">{props.children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
