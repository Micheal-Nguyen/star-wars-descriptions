
import './App.css';
import 'bootstrap';
import {Dropdown} from 'react-bootstrap';
import React, {Component} from 'react';
import Characters from './Components/Characters'

class App extends Component {
  render() {
    return (
      <div>
        <h1>
          <Dropdown>
            <Dropdown.Toggle >
              People
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">People</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Planets</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </h1>
        <div>
          <Characters/>
        </div>
      </div>
    );
  }
}
export default App;
