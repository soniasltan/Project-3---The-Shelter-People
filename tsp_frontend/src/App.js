import React from "react";
import "./App.css";
import { BrowserRouter as Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import About from "./Components/About";
import Contact from "./Components/Contact";
import CatsList from "./Pages/CatsList";
import CatsUpdate from "./Pages/CatsUpdate";
import CatsCreate from "./Pages/CatsCreate";
import AuthCatShow from "./Pages/AuthCatShow";
import CatShow from "./Pages/CatShow";
import Login from "./Pages/Login"
import UserCreate from "./Pages/UserCreate"

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/users/new">
          <UserCreate />
        </Route>
        <Route path="/cats">
          <CatsList />
        </Route>
        {/* Not sure how to implement sessions yet, if Auth, show AuthCatShow, otherwise, CatShow */}
        <Route path="/cats/:id">
          <AuthCatShow />
          {/* <CatShow /> */}
        </Route>
        <Route path="/cats/new">
          <CatsCreate />
        </Route>
        <Route path="/cats/:id/edit">
          <CatsUpdate />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
