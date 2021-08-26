import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import UserList from "./components/exercises-list.component";
import EditUser from "./components/edit-exercise.component";
import CreateUser from "./components/create-exercise.component";
import SearchUser from "./components/search-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={UserList} />
        <Route path="/edit/:id" component={EditUser} />
        <Route path="/create" component={CreateUser} />
        <Route path="/users" component={SearchUser} />
      </div>
    </Router>
  );
}

export default App;
