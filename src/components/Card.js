import React, { Component } from "react";
import styled, { keyframes, css } from "react-emotion";
import { cardSize, colors } from "../ThemeSettings";

const { width, height, padding, margin } = cardSize;
const fontSize = "1.5rem";

const CardBacking = styled("div")`
  border-radius: 10px;
  background-color: ${colors.dark};
  width: ${width - 2 * padding - 2 * margin}px;
  height: ${height - 2 * padding - 2 * margin}px;
  padding: ${padding}px;
  margin: ${margin}px;

  &:hover {
    button {
      display: block;
    }
  }
`;

const CardBody = styled("div")(
  props => css`
    border-radius: 10px;
    background-color: ${colors[props.color]};
    width: 100%;
    height: calc(100% - ${padding}px - ${fontSize});
    margin-top: calc(${padding}px + ${fontSize});
  `
);

const CardTitle = styled("span")(
  props => css`
    font-size: ${fontSize};
    font-weight: bold;
    color: ${colors.light};
    float: ${props.side};
  `
);

const HalfButton = styled("button")(
  props => css`
		display: none;
    width: 100%;
    height: 50%;
    background: none;
    border: none;
		outline: none;
		border-${props.side}-right-radius: 10px;
		border-${props.side}-left-radius: 10px;

		border: 1px solid ${colors.dark};
		border-left: none;
		border-right: none;
		border=${props.side}: none;

		&:hover {
			background: rgba(255, 255, 255, 0.5);
		}
  `
);

const FullButton = styled("button")(
  props => css`
    display: none;
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    outline: none;
    border-radius: 10px;

    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  `
);

class Card extends Component {
  render() {
    const { onPlay, onDiscard, onDraw, hidden } = this.props;
    const { value, color } = this.props.card;

    let displayValue = value;
    if (hidden) {
      displayValue = "?";
    } else if (value <= 0) {
      displayValue = "*";
    }

    return (
      <CardBacking>
        {/* <CardTitle side="left">{displayValue}</CardTitle> */}
        <CardTitle side="right">{displayValue}</CardTitle>
        <CardBody color={hidden ? "dark" : color}>
          {onDiscard &&
            onPlay && (
              <>
                <HalfButton side={"top"} onClick={onDiscard}>
                  Discard
                </HalfButton>
                <HalfButton side={"bottom"} onClick={onPlay}>
                  Play
                </HalfButton>
              </>
            )}
          {onDraw && (
            <FullButton onClick={() => onDraw(this.props.card)}>
              Draw
            </FullButton>
          )}
        </CardBody>
      </CardBacking>
    );
  }
}

export default Card;
