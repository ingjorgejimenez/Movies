import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
function Favoritos(props) {
    const [windowHeight, setWindowHeight] = useState(0);
    let token = sessionStorage.getItem('token');
    // const [favorites, setFavorites] = useState([]);
    // useEffect(() => {
    //     const favsInLocal = localStorage.getItem('favs');
    //     // console.log(favsInLocal);
    //     if (favsInLocal != null) {
    //         const fasvArray = JSON.parse(favsInLocal);
    //         console.log(fasvArray);
    //         setFavorites(fasvArray);
    //     }
    // }, [])
    useEffect(() => {
        let readHeader = document.querySelector("header");
        let readfooter = document.querySelector("footer");
        setWindowHeight(window.innerHeight);
        let resultHeight = windowHeight - readHeader.clientHeight - readfooter.clientHeight - 25;
        document.querySelector(".initHeigth").style.minHeight = `${resultHeight}px`;
    }, [windowHeight])
    return (
        <div className="initHeigth">
            {!token && <Navigate to="/" replace />}
            {!props.favorites.length && <div className='col-12 text-danger'><h1>No existen peliculas en favorito</h1></div>}
            {props.favorites.length >= 1 &&
                <>
                    <h1>Seccion de Favoritos</h1>
                    <div className='row'>

                        {props.favorites.map((movies, idx) => {
                            return (
                                <div className="col-md-3 my-3" key={idx} style={{ color: 'black' }}>
                                    <div className="card" >
                                        <img src={movies.imgURL} className="card-img-top img-responsive" alt="Card image cap" />
                                        <button
                                            className='favorite-btn'
                                            onClick={props.addOrRemoveFromFavs}
                                            data-movie={movies.id}
                                        >🖤</button>
                                        <div className="card-body">
                                            <h5 className="card-title">{movies.title}</h5>
                                            <p className="card-text">{movies.overview.substring(0, 100)}...</p>
                                            <Link to={`/detalle?movieId=${movies.id}`} className="btn btn-bg-color">Ver detalles</Link>

                                        </div>
                                    </div>

                                </div>
                            )
                        })}


                    </div>
                </>
            }
        </div>

    )
}
export default Favoritos;