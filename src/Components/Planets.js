import {Card, CardDeck, Col} from 'react-bootstrap';
import React, {Component} from 'react';
import axios from 'axios';

class Planets extends Component {
    constructor(props) {
        super(props);
        this.state = {
          planets: []
        };
      }

    // Updates state with planets from swapi
    componentDidMount(){
        axios.get('https://swapi.dev/api/planets/')
            .then(res => {
                this.setState({planets: res.data.results});
            });
    }
    
    // Function that capitalizes first letter of a string
    capitalizeDetail(det){
        return det.charAt(0).toUpperCase() + det.slice(1);
    }

    render() {
        let planets = this.state.planets;
        return (        
            <CardDeck>
                {planets.map(planet => {
                    return (
                        <Col md={4} key={planet.name} className="star-wars-col">
                            <Card>
                                <Card.Body>
                                    <Card.Title><b>{planet.name}</b></Card.Title>
                                    <b>Climate: </b>{this.capitalizeDetail(planet.climate)}<br/>
                                    <b>Terrain: </b>{this.capitalizeDetail(planet.terrain)}<br/>
                                    <b>Population: </b>{this.capitalizeDetail(planet.population)}<br/>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </CardDeck>)
    }

}

export default Planets;