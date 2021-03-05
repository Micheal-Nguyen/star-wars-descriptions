import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function getCharacters() {
  axios.get('https://swapi.dev/api/people/')
  .then(res => {
      let characters = res.data
  });
}

function getPlanets() {
  axios.get('https://swapi.dev/api/planets/')
  .then(res => {
      let planets = res.data
  });
}

function getFilms() {
  axios.get('https://swapi.dev/api/films/')
  .then(res => {
      let films = res.data
  });
}

function App() {


  return (
    <div className="App">
    </div>
  );
}

export default App;
