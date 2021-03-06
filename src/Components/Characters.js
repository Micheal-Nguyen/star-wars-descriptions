import {Card, CardDeck, Col} from 'react-bootstrap';
import React, {Component} from 'react';
import axios from 'axios';

class Characters extends Component {
    constructor(props) {
        super(props);
        this.state = {
          characters: []
        }
      }

    async componentDidMount(){
        axios.get('https://swapi.dev/api/people/')
            .then(res => {
                let characters = res.data.results;
                this.setState({characters});
            });

    }
    

    render() {
        let characters = this.state.characters;
        console.log(characters);
        return (        
            <CardDeck>
                {characters.map(char => {
                return (
                    <Col md={4} key={char.name}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{char.name}</Card.Title>
                                <b>Height: </b>{char.height} cm<br/>
                                <b>Mass: </b>{char.mass} kg<br/>
                                <b>Hair Color: </b>{char.hair_color}<br/>
                                <b>Eye Color: </b>{char.eye_color}<br/>
                                <b>Birth Year: </b>{char.birth_year}<br/>
                                <b>Homeworld: </b>{char.homeworld}
                            </Card.Body>
                        </Card>
                    </Col>
                )
                })}
            </CardDeck>)
    }

}

export default Characters;