import React, { Component } from "react";
import { css } from "react-emotion";
import Hand from "./components/Hand";
import DiscardPile from "./components/DiscardPile";
import Deck from "./components/Deck";
import Stacks from "./components/Stacks";

const AppStyles = css`
  text-align: center;
`;

const PHASE = {
  PLAY: 0,
  DRAW: 1
};

const PLAYER = {
  AI: 0,
  USER: 1
};

const last = arr => {
  if (arr.length) {
    return arr[arr.length - 1];
  } else {
    return null;
  }
};

export const COLORS = ["red", "green", "white", "blue", "yellow"];
const NUMBERS = [-2, -1, 0, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const HAND_SIZE = 8;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
  }
}

class App extends Component {
  state = {
    log: [],
    currentPlayer: PLAYER.USER,
    currentPhase: PHASE.PLAY,
    deck: [],
    discards: {
      red: [],
      yellow: [],
      blue: [],
      green: [],
      white: []
    },
    players: [
      {
        id: PLAYER.AI,
        stacks: {
          red: [],
          yellow: [],
          blue: [],
          green: [],
          white: []
        },
        hand: [
          // { value: 6, color: "red" },
          // { value: 5, color: "blue" },
          // { value: 10, color: "green" },
          // { value: 2, color: "yellow" },
          // { value: 0, color: "yellow" }
        ]
      },
      {
        id: PLAYER.USER,
        stacks: {
          red: [],
          yellow: [],
          blue: [],
          green: [],
          white: []
        },
        hand: [
          // { value: 6, color: "red" },
          // { value: 5, color: "blue" },
          // { value: 10, color: "green" },
          // { value: 2, color: "yellow" },
          // { value: 0, color: "yellow" }
        ]
      }
    ]
  };

  constructor(props) {
    super(props);

    COLORS.forEach(color => {
      NUMBERS.forEach(value => {
        this.state.deck.push({ color, value });
      });
    });

    shuffleArray(this.state.deck);

    for (let i = 0; i < HAND_SIZE; i++) {
      this.state.players[0].hand.push(this.state.deck.pop());
      this.state.players[1].hand.push(this.state.deck.pop());
    }
  }

  render() {
    return (
      <div className={AppStyles}>
        <hr />
        State: {this.state.currentPlayer === PLAYER.USER ? "USER" : "AI"}{" "}
        {this.state.currentPhase === PHASE.PLAY ? "PLAY" : "DRAW"}
        <hr />
        <Hand
          player={this.state.players.find(p => p.id === PLAYER.AI)}
          onHandChanged={this.onHandChanged.bind(this)}
          onCardPlay={this.playCard.bind(this)}
          onCardDiscard={this.discardCard.bind(this)}
        />
        <hr />
        <div
          className={css`
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <div
            className={css`
              font-family: monospace;
            `}
          >
            {this.state.log.map(m => (
              <>
                <span>{m}</span>
                <br />
              </>
            ))}
          </div>
          <div
            className={css`
              display: flex;
              flex-direction: column;
              justify-content: center;
            `}
          >
            <Stacks player={this.state.players.find(p => p.id === PLAYER.AI)} />
            <div
              className={css`
                display: flex;
                justify-content: center;
              `}
            >
              {COLORS.map(color => (
                <DiscardPile
                  key={color}
                  pile={this.state.discards[color]}
                  color={color}
                  onDraw={this.onDrawFromDiscard.bind(this)}
                />
              ))}
            </div>
            <Stacks
              player={this.state.players.find(p => p.id === PLAYER.USER)}
            />
          </div>
          <Deck
            cards={this.state.deck}
            onDraw={this.onDrawFromDeck.bind(this)}
          />
        </div>
        <hr />
        <Hand
          player={this.state.players.find(p => p.id === PLAYER.USER)}
          onHandChanged={this.onHandChanged.bind(this)}
          onCardPlay={this.playCard.bind(this)}
          onCardDiscard={this.discardCard.bind(this)}
        />
      </div>
    );
  }

  currentPlayerName() {
    return this.state.currentPlayer === PLAYER.AI ? "AI" : "User";
  }

  currentPhaseName() {
    return this.state.currentPhase === PHASE.DRAW ? "DRAW" : "PLAY";
  }

  onDrawFromDiscard(card) {
    if (
      this.state.currentPhase !== PHASE.DRAW ||
      card === this.state.lastDiscard
    ) {
      return;
    }

    const discards = this.state.discards;
    discards[card.color].pop();

    const player = this.state.players.find(
      p => p.id === this.state.currentPlayer
    );
    const other = this.state.players.find(
      p => p.id !== this.state.currentPlayer
    );

    player.hand.push(card);

    this.setState({
      discards: discards,
      players: [player, other],
      lastDiscard: null,
      currentPlayer:
        this.state.currentPlayer === PLAYER.AI ? PLAYER.USER : PLAYER.AI,
      currentPhase: PHASE.PLAY
    });
  }

  onDrawFromDeck(card) {
    if (this.state.currentPhase !== PHASE.DRAW) {
      return;
    }

    console.log(card, this.state);

    const deck = this.state.deck;
    deck.shift();

    const player = this.state.players.find(
      p => p.id === this.state.currentPlayer
    );
    const other = this.state.players.find(
      p => p.id !== this.state.currentPlayer
    );

    player.hand.push(card);

    this.setState({
      deck: deck,
      players: [player, other],
      lastDiscard: null,
      currentPlayer:
        this.state.currentPlayer === PLAYER.AI ? PLAYER.USER : PLAYER.AI,
      currentPhase: PHASE.PLAY
    });
  }

  playCard(playerId, card, index) {
    // Check if play is valid
    // Splice card out from hand
    // put in correct stack
    // update game state

    if (
      this.state.currentPlayer !== playerId ||
      this.state.currentPhase !== PHASE.PLAY
    ) {
      return;
    }

    const player = this.state.players.find(p => p.id === playerId);
    if (!player) {
      console.error("invalid player id", playerId);
      return;
    }

    const stack = player.stacks[card.color];
    if (stack.length && stack[stack.length - 1].value > card.value) {
      return;
    }

    player.hand.splice(index, 1);
    player.stacks[card.color].push(card);

    const other = this.state.players.find(p => p.id !== playerId);
    this.setState({
      players: [other, player],
      currentPhase: PHASE.DRAW
    });
  }

  discardCard(playerId, card, index) {
    if (
      this.state.currentPlayer !== playerId ||
      this.state.currentPhase !== PHASE.PLAY
    ) {
      return;
    }

    const other = this.state.players.find(p => p.id !== playerId);
    const player = this.state.players.find(p => p.id === playerId);
    if (!player) {
      console.error("invalid player id", playerId);
      return;
    }

    player.hand.splice(index, 1);

    const discards = this.state.discards;
    discards[card.color] = [...discards[card.color], card];

    this.setState({
      discards: discards,
      players: [other, player],
      currentPhase: PHASE.DRAW,
      lastDiscard: card
    });
  }

  randomAI() {
    if (this.state.currentPlayer !== PLAYER.AI) {
      return;
    }

    const player = this.state.players.find(p => p.id === PLAYER.AI);

    if (this.state.currentPhase === PHASE.PLAY) {
      // TODO Ensure play is available
      const i = Math.floor(Math.random() * (HAND_SIZE + 1));
      const card = player.hand[i];
      const discard = Math.random() > 0.5;
      if (discard) {
        this.discardCard(PLAYER.AI, card, i);
        this.log("Discarding card");
      } else {
        this.playCard(PLAYER.AI, card, i);
        this.log("Playing card");
      }
    } else {
      const valid = [];
      COLORS.forEach(color => {
        if (this.state.discards[color].length) {
          valid.push(color);
        }
      });
      if (!valid.length || Math.random() > 0.5) {
        // Draw from deck
        this.onDrawFromDeck(this.state.deck[0]);
        this.log("Drawing from deck");
      } else {
        const color = valid[Math.floor(Math.random() * (valid.length + 1))];
        this.onDrawFromDiscard(this.state.discards[color][0]);
        this.log("Drawing from discard " + color);
      }
    }
  }

  log(m) {
    this.setState({
      log: [m, ...this.state.log]
    });
    console.log(m);
  }

  componentDidUpdate() {
    this.randomAI();
  }

  onHandChanged(hand) {
    this.setState({ hand: hand });
  }
}

export default App;
