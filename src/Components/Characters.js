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

    // Updates state with characters and relevant data from swapi
    async componentDidMount(){
        let characters = [];
        await axios.get('https://swapi.dev/api/people/')
            .then(res => {
                characters = res.data.results;
            });

        let films = [];
        await axios.get('https://swapi.dev/api/films')
            .then(res => {
                films = res.data.results;
            });

        let promises = [];
        characters.forEach(char => {
            let charFilmNames = [];
            char.films.forEach(film => {
                let filmDetails = films.find(x => x.url === film);
                charFilmNames.push(`Episode ${filmDetails.episode_id} - ${filmDetails.title}`);
            });
            char.films = charFilmNames.sort();
            promises.push(axios.get(char.homeworld).then(res => {char.homeworld = res.data.name}));
        });

        await Promise.all(promises).then(() => {
            this.setState({characters});
        });

    }
    
    // Capitalizes first letter of a string
    capitalizeDetail(det){
        return det.charAt(0).toUpperCase() + det.slice(1);
    }

    render() {
        let characters = this.state.characters;
        return (        
            <CardDeck>
                {characters.map(char => {
                    return (
                        <Col md={4} key={char.name} className="star-wars-col">
                            <Card>
                                <Card.Body>
                                    <Card.Title><b>{char.name}</b></Card.Title>
                                    <b>Height: </b>{char.height} cm<br/>
                                    <b>Mass: </b>{char.mass} kg<br/>
                                    <b>Hair Color: </b>{char.hair_color === "n/a" ? "N/A" : this.capitalizeDetail(char.hair_color)}<br/>
                                    <b>Eye Color: </b>{this.capitalizeDetail(char.eye_color)}<br/>
                                    <b>Birth Year: </b>{this.capitalizeDetail(char.birth_year)}<br/>
                                    <b>Homeworld: </b>{char.homeworld}<br/><br/>
                                    <b>Appeared In </b>
                                    <ul>
                                        {char.films.map(film => {
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