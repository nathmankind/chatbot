import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { sendMessage } from "./chat";

class App extends Component {
  render() {
    const { feed, sendMessage } = this.props;
    return (
      <div className="container">
        <div className=" my-3 py-3">
          <h1>Conversational ChatBot</h1>
          <ul>
            {feed.map((entry) => (
              <li>{entry.text}</li>
            ))}
          </ul>
          <input
            type="text"
            onKeyDown={(e) =>
              e.keyCode === 13 ? sendMessage(e.target.value) : null
            }
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  feed: state,
});

export default connect(mapStateToProps, { sendMessage })(App);
