import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./components/Login";
import Listado from './components/Listado';
import Detalle from './components/Detalle';
// import Contacto from './components/Contacto';
import Resultados from './components/Resultados';
import Favoritos from './components/Favoritos';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Registro from "./components/Registro";

function App() {
  const [favorites, setFavorites] = useState([]);
  const [estado, setEstado] = useState(null);
  const [estadoSearch, setEstadoSearch] = useState(null);
  let token = sessionStorage.getItem('token');

  useEffect(() => {
    const favsInLocal = localStorage.getItem('favs');
    // console.log(favsInLocal);
    if (favsInLocal != null) {
      const fasvArray = JSON.parse(favsInLocal);
      console.log(fasvArray);
      console.log(estado);
      setFavorites(fasvArray);
    }
    if (token != null) {
      setEstado(1);
      setEstadoSearch(1);
    }
  }, [])

  const readSearch = e => {
    console.log('click');
    console.log(estadoSearch);
    setEstadoSearch(estadoSearch + 1);
  }

  const readApp = e => {
    setEstado(1);
    console.log(estado);

  }

  const addOrRemoveFromFavs = e => {
    const favMovies = localStorage.getItem('favs');
    // console.log(favMovies);
    let tempMoviesInFavs;

    if (favMovies === null) {
      tempMoviesInFavs = [];
    } else {
      tempMoviesInFavs = JSON.parse(favMovies);
    }
    // tempMoviesInFavs.push('Jorge_Jimenez');
    // console.log(tempMoviesInFavs);
    const btn = e.currentTarget;  // console.log(btn);
    const parent = btn.parentElement; // console.log(parent)
    const imgURL = parent.querySelector('img').getAttribute('src');
    const title = parent.querySelector('h5').innerText;
    const overview = parent.querySelector('p').innerText;
    // let id = btn.dataset.movie;
    const movieData = {
      imgURL,
      title,
      overview,
      id: btn.dataset.movie
    }
    // filter me devuelve todas las coincidencia y find me devuele si existe
    let movieIsInArray = tempMoviesInFavs.find(oneMovie => {
      return (oneMovie.id === movieData.id)
    });

    if (!movieIsInArray) {
      tempMoviesInFavs.push(movieData);
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs);
      console.log('se agrego la pelicula');
      parent.querySelector('button').innerText = "🖤";
    } else {
      let moviesLeft = tempMoviesInFavs.filter(oneMovie => {
        return oneMovie.id !== movieData.id
      });
      tempMoviesInFavs = moviesLeft;
      localStorage.setItem('favs', JSON.stringify(moviesLeft));
      setFavorites(moviesLeft);
      console.log('se elimino la pelicula');
      parent.querySelector('button').innerText = "💓";
    }
    console.log(tempMoviesInFavs);



  }

  return (
    <>
      <Header favorites={favorites} estado={estado} estadoSearch={estadoSearch} readSearch={readSearch} />

      <div className="container mt-3 ">
        <Routes>
          <Route exact path='/' element={<Login readApp={readApp} />} />
          <Route exact path='/Movies' element={<Login readApp={readApp} />} />
          <Route path='/registro' element={<Registro />} />
          <Route
            path="/listado"
            element={<Listado readApp={readApp} estado={estado} addOrRemoveFromFavs={addOrRemoveFromFavs} />}
          />
          {/* <Route path="/listado" render={(props) => <Listado addOrRemoveFromFavs={addOrRemoveFromFavs} {...props} />} /> */}
          <Route
            path='/detalle'
            element={<Detalle addOrRemoveFromFavs={addOrRemoveFromFavs} />} />
          {/* <Route path='/contacto' element={<Contacto />} /> */}
          <Route
            path="/resultados"
            element={<Resultados estadoSearch={estadoSearch} />}
          />
          <Route
            path='/favoritos'
            element={<Favoritos favorites={favorites} addOrRemoveFromFavs={addOrRemoveFromFavs} />} />
        </Routes>

      </div>

      <Footer />
    </>
  );
}
export default App;
