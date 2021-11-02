import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import About from "./Components/About";
import Contact from "./Components/Contact";
import CatsList from "./Pages/CatsList";
import CatsUpdate from "./Pages/CatsUpdate";
import CatsCreate from "./Pages/CatsCreate";
import AuthCatShow from "./Pages/AuthCatShow";
import CatShow from "./Pages/CatShow";
import Login from "./Pages/Login";
import UserCreate from "./Pages/UserCreate";

function App() {
  const [auth, setAuth] = useState("NoAuth");
  const [role, setRole] = useState("Guest");
  const [username, setUsername] = useState("");
  return (
    <div className="App">
      <Router>
        <NavBar role={role} />
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Switch>
          <Route path="/login">
            <Login
              auth={auth}
              setAuth={setAuth}
              setRole={setRole}
              setUsername={setUsername}
            />
          </Route>
          <Route path="/users/new">
            <UserCreate />
          </Route>
          <Route path="/cats/list">
            <CatsList />
          </Route>
          {/* ?? if first one is undef, take the second */}
          {role === "Admin" && (
            <Route path="/cats/new">
              <CatsCreate />
            </Route>
          )}
          <Route path="/cats/edit/:id">
            <CatsUpdate />
          </Route>
          <Route path="/cats/:id">
            <AuthCatShow />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
