import {Card, CardDeck, Col} from 'react-bootstrap';
import React, {Component} from 'react';
import axios from 'axios';

class Characters extends Component {
    constructor(props) {
        super(props);
        this.state = {
          characters: []
        };
      }

    async componentDidMount(){
        let characters = [];
        await axios.get('https://swapi.dev/api/people/')
            .then(res => {
                characters = res.data.results;
            });
        let promises = [];
        characters.forEach(char => {
            promises.push(axios.get(char.homeworld).then(res => {char.homeworld = res.data.name}))
            char.filmNames = [];
            char.films.forEach(film => {
                promises.push(
                    axios.get(film).then(res => {
                        let data = res.data;
                        let title = 'Episode ' + data.episode_id + ' - ' + data.title;
                        char.filmNames.push(title);
                    })
                )  
            })
        });
        await Promise.all(promises).then(() => {
            this.setState({characters});
        });
    }
    

    render() {
        let characters = this.state.characters;
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
                                <b>Homeworld: </b>{char.homeworld}<br/><br/>
                                <b>Appeared In </b>
                                <ul>
                                    {char.filmNames.map(film => {
                                        return (
                                            <li key={film}>
                                                {film}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                )
                })}
            </CardDeck>)
    }

}

export default Characters;