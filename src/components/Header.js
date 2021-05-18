import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectUser } from "../features/userSlice";

const Header = () => {
  const [title, setTitle] = useState("welcome");
  const [description, setDescription] = useState("share link to earn money");
  const user = useSelector(selectUser);
  useEffect(() => {
    if (user?.user.id) {
      setTitle(`$${user.user.revenue}`);
      setDescription("you have earned this far");
    } else {
      setTitle(`welcome`);
      setDescription("share links to earn money");
    }
  }, [user]);
  return (
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">{title}</h1>
          <p class="lead text-muted">{description}</p>
          {user == null ? (
            <p>
              <a href="/login" class="btn btn-primary my-2">
                login
              </a>
              <a href="/register" class="btn btn-primary my-secondary my-2">
                register
              </a>
            </p>
          ) : (
            <br />
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;
