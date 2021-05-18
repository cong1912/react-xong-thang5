import React, { useEffect, useState } from "react";
import "./App.css";
import ProductsFrontend from "./pages/ProductsFrontend";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/userSlice";
import Profile from "./pages/Profile";
import Stats from "./pages/Stats";
import Rankings from "./pages/Rankings";
import ProductsBackend from "./pages/ProductsBackend";

function App() {
  const [user, setUser] = useState("");
  const [reset, setReset] = useState(false);
  const dispatch = useDispatch();
  useEffect(async () => {
    await axios
      .get("user")
      .then((result) => {
        setUser(result.data);
        setReset(true);
        dispatch(login({ user }));
      })
      .catch(function (error) {
        dispatch(logout({ user: null }));
        console.log(error);
      });
  }, [reset]);
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/rankings">
            <Rankings />
          </Route>
          <Route path="/stats">
            <Stats />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route exact path="/">
            <ProductsFrontend />
          </Route>
          <Route exact path="/backend">
            <ProductsBackend />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
