import React, { Component } from "react";
import BooksList from "../Book/BooksList";

//class component for landing page to show list of books
class Landing extends Component {
  
  render() {
    return (
      <div>
        <BooksList />
      </div>
    );
  }
}

export default Landing;