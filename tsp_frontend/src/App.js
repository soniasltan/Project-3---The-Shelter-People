import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import CatsList from "./Pages/CatsList";
import CatsUpdate from "./Pages/CatsUpdate";
import CatsCreate from "./Pages/CatsCreate";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/">
          <Home />
        </Route>
        <Route exact path="/cats">
          <CatsList />
        </Route>
        <Route path="/cats/new">
          <CatsCreate />
        </Route>
        <Route path="/cats/:id/edit">
          <CatsUpdate />
        </Route>
      </Router>
    </div>
  );
}

export default App;
