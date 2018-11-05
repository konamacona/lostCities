import React, { Component } from "react";
import styled, { keyframes, css } from "react-emotion";
import { colors } from "../ThemeSettings";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from "./Card";

const HandContainer = styled("div")`
  display: flex;
  justify-content: center;
`;

class Hand extends Component {
  render() {
    return (
      <HandContainer>
        {this.props.player.hand.map((c, i) => (
          <Card
            key={c.color + c.value.toString()}
            card={c}
            onPlay={() => this.props.onCardPlay(this.props.player.id, c, i)}
            onDiscard={() =>
              this.props.onCardDiscard(this.props.player.id, c, i)
            }
          />
        ))}
      </HandContainer>
    );
  }
}

export default Hand;
