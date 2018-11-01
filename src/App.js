import React, { Component } from "react";
import logo from "./logo.svg";
import styled, { keyframes, css } from "react-emotion";

const AppLogoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const AppLogo = styled("img")`
  animation: ${AppLogoSpin} infinite 20s linear;
  height: 40vmin;
`;

const AppHeader = styled("header")`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const AppLink = styled("a")`
  color: #61dafb;
`;

const AppStyles = css`
  text-align: center;
`;

class App extends Component {
  render() {
    return (
      <div className={AppStyles}>
        <AppHeader>
          <AppLogo src={logo} alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <AppLink
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </AppLink>
        </AppHeader>
      </div>
    );
  }
}

export default App;
