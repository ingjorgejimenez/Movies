import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
function Favoritos(props) {
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
    return (
        <>
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
        </>

    )
}
export default Favoritos;