import React, { Component } from "react";
import styled, { css } from "react-emotion";
import { cardSize, colors } from "../ThemeSettings";
import MiniCard from "./MiniCard";

import { COLORS } from "../App";

const StacksContainer = styled("div")(
  props => css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  `
);

const StackContainer = styled("div")(
  props => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
    background-color: ${colors[props.color]};
    min-width: ${cardSize.width}px;
    min-height: 100px;

    border-top: 2px solid ${colors.dark};
    border-bottom: 2px solid ${colors.dark};
  `
);

const DiscardPlaceholder = styled("div")``;

class Stacks extends Component {
  render() {
    return (
      <StacksContainer color={this.props.color}>
        {COLORS.map(this.getStackForColor.bind(this))}
      </StacksContainer>
    );
  }

  getStackForColor(color) {
    const stack = this.props.player.stacks[color];

    return (
      <StackContainer color={color}>
        {stack.map(card => (
          <MiniCard card={card} />
        ))}
      </StackContainer>
    );
  }
}

export default Stacks;
