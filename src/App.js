
import './App.css';
import 'bootstrap';
import {Dropdown, Col} from 'react-bootstrap';
import React, {Component} from 'react';
import Characters from './Components/Characters';
import Planets from './Components/Planets';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      viewCharacters: true
    };
  }

  render() {

    let viewCharacters = this.state.viewCharacters;
    const handleCharactersOnClick = () => this.setState({viewCharacters: true});
    const handlePlanetsOnClick = () => this.setState({viewCharacters: false});

    return (
      <div>
        <h1>
          <Dropdown>
            <Dropdown.Toggle >
              {viewCharacters ? "People": "Planets"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleCharactersOnClick()}>People</Dropdown.Item>
              <Dropdown.Item onClick={() => handlePlanetsOnClick()}>Planets</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </h1>
        <div>
          <Col md={10}>
            {viewCharacters ? <Characters/>: <Planets/>}
          </Col>
        </div>
      </div>
    );
  }
}
export default App;
