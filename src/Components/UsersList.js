import React, { Component } from "react";
import logo from "../logo.svg";

export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.handleClick.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      user: null,
      searchTerm: "",
    };
  }

  handleClick(event, key) {
    let opacity = document.getElementsByClassName("info")[key].style.opacity;
    if (opacity === "0") {
      document.getElementsByClassName("info")[key].style.maxHeight = "500px";
      document.getElementsByClassName("info")[key].style.opacity = "1";
    } else {
      document.getElementsByClassName("info")[key].style.maxHeight = "0";
      document.getElementsByClassName("info")[key].style.opacity = "0";
    }
  }

  async componentDidMount() {
    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ user: data, loading: false });
  }

  render() {
    const { error } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      const { user, searchTerm } = this.state;
      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
            <a
              className="navbar-brand"
              href="https://www.gunsonpegs.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="App-logo"
                src={logo}
                alt="GunsOnPegs Logo in White"
              />
              <b>ITap Group Recruitment Task</b>
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="https://jj1.dev/projects">
                    More Projects
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <h2>Users list</h2>
          <input
            type="text"
            placeholder="Search by user name or email..."
            onChange={(event) => {
              this.setState({ searchTerm: event.target.value });
            }}
          />
          {this.state.isLoaded || !user ? (
            <div>Loading...</div>
          ) : (
            <div class="users">
              {user
                .filter((val) => {
                  if (searchTerm === "") {
                    return val;
                  } else if (
                    val.username
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  } else if (
                    val.email.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  } else if (
                    val.name.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  } else if (val.id.toString().includes(searchTerm)) {
                    return val;
                  }
                })
                .map((val, key) => {
                  return (
                    <>
                      <div
                        className="user"
                        key={key}
                        onClick={(e) => this.handleClick(e, key)}
                      >
                        <ul>
                          <li key={val.id}>
                            <span className="id">{val.id}.</span>
                            <span className="name">{val.name}</span>
                            <span className="username">@{val.username}</span>
                          </li>
                        </ul>
                      </div>
                      <div className="info">
                        <ul>
                          <li className="moreInfo" key={val.id}>
                            <span className="email">EMAIL: </span>
                            <a href={"mailto:" + val.email}>{val.email}</a>
                            <br />
                            <span className="phone">PHONE: </span>
                            <a href={"tel:" + val.phone}>{val.phone}</a>
                            <br />
                            <span className="website">WEBSITE: </span>
                            <a
                              target="_blank"
                              href={"https://www." + val.website}
                              rel="noopener noreferrer"
                            >
                              {val.website}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                })}
            </div>
          )}
        </div>
      );
    }
  }
}
