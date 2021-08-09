import React, {Component} from 'react';
import Card from './Card';
import './Deck.css';
import axios from 'axios';

const API_BASE_URL = 'https://www.deckofcardsapi.com/api/deck';

export class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {deck: null, drawn: []};
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle/?deck_count=1`);
    this.setState({deck: deck.data});
  }

  async getCard() {
    // API_BASE_URL<<deck_id>>/draw/?count=2
    //make request using Deck ID
    //setState using new card info from API
    // axios.get
    let id = this.state.deck.deck_id;
    try {
      let cardUrl = `${API_BASE_URL}/${id}/draw/`;
      let cardRes = await axios.get(cardUrl);
      if (!cardRes.data.success) {
        throw new Error('No cards remaining!');
      }
      let card = cardRes.data.cards[0];
      this.setState((st) => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit}`,
          },
        ],
      }));
    } catch (err) {
      alert(err);
    }
  }

  render() {
      const cards = this.state.drawn.map(c => (
        <Card key={c.id} name={c.name} image={c.image} />
        ));
    return (
      <div>
        <h1 className="Deck-title">Card Dealer</h1>
        <h2 className="Deck-title subtitle">A little demo made with React</h2>
        <button className="Deck-btn" onClick={this.getCard}>Get Card!</button>
        <div className="Deck-cardarea">
            {cards}
        </div>
      </div>
    );
  }
}

export default Deck;
