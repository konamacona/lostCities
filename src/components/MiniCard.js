import React, { Component } from "react";
import styled, { css } from "react-emotion";
import { cardSize, colors } from "../ThemeSettings";

const { width, padding, margin } = cardSize;
const fontSize = "1.5rem";

const CardBacking = styled("div")`
  border-radius: 10px;
  background-color: ${colors.dark};
  width: ${width - 2 * padding - 2 * margin}px;
  height: ${fontSize + 2 * padding + 2 * margin}px;
  padding: ${padding}px;
  margin: ${margin}px;

  display: flex;
  justify-content: stretch;
`;

const CardBody = styled("div")(
  props => css`
    flex-grow: 1;
    border-radius: 10px;
    background-color: ${colors[props.color]};
  `
);

const CardTitle = styled("span")(
  props => css`
    font-size: ${fontSize};
    font-weight: bold;
    color: ${colors.light};
    float: ${props.side};
    margin-left: ${2 * margin}px;
  `
);

class MiniCard extends Component {
  render() {
    const { value, color } = this.props.card;

    let displayValue = value <= 0 ? "*" : value;

    return (
      <CardBacking>
        <CardBody color={color} />
        <CardTitle side="right">{displayValue}</CardTitle>
      </CardBacking>
    );
  }
}

export default MiniCard;
