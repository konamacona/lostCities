import React, { Component } from "react";
import styled, { css } from "react-emotion";
import { cardSize, colors } from "../ThemeSettings";
import Card from "./Card";

const DiscardContainer = styled("div")(
  props => css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
    background-color: ${colors[props.color]};
    min-height: ${cardSize.height}px;
    min-width: ${cardSize.width}px;
  `
);

const DiscardPlaceholder = styled("div")``;

class DiscardPile extends Component {
  render() {
    const pile = this.props.pile;
    const card = pile.length ? pile[pile.length - 1] : null;

    const placeHolders = [];
    for (let i = 0; i < pile.length - 1; i++) {
      placeHolders.push(<DiscardPlaceholder key={i} />);
    }

    return (
      <DiscardContainer color={this.props.color}>
        {placeHolders}
        {card && <Card card={card} onDraw={this.props.onDraw} />}
      </DiscardContainer>
    );
  }
}

export default DiscardPile;
