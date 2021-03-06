import {Card, CardDeck, Col} from 'react-bootstrap';
import React, {Component} from 'react';
import axios from 'axios';

class Planets extends Component {
    constructor(props) {
        super(props);
        this.state = {
          planets: []
        }
      }

    componentDidMount(){
        axios.get('https://swapi.dev/api/planets/')
            .then(res => {
                this.setState({planets: res.data.results})
            });
    }
    

    render() {
        let planets = this.state.planets;
        return (        
            <CardDeck>
                {planets.map(planet => {
                return (
                    <Col md={4} key={planet.name}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{planet.name}</Card.Title>
                                <b>Climate: </b>{planet.climate}<br/>
                                <b>Terrain: </b>{planet.terrain}<br/>
                                <b>Population: </b>{planet.population}<br/>
                            </Card.Body>
                        </Card>
                    </Col>
                )
                })}
            </CardDeck>)
    }

}

export default Planets;