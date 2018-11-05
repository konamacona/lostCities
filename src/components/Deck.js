import React, { Component } from "react";
import styled, { css } from "react-emotion";
import { cardSize, colors } from "../ThemeSettings";
import Card from "./Card";

const DeckContainer = styled("div")(
  props => css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
    background-color: "white";
    border: 5px solid ${colors.dark};
    min-height: ${cardSize.height}px;
    min-width: ${cardSize.width}px;

    margin-left: 20px;
  `
);

const DiscardPlaceholder = styled("div")``;

class Deck extends Component {
  render() {
    const deck = this.props.cards;
    const card = deck.length ? deck[0] : null;

    return (
      <DeckContainer color={this.props.color}>
        Deck:
        <Card card={card} onDraw={this.props.onDraw} hidden={true} />
      </DeckContainer>
    );
  }
}

export default Deck;
