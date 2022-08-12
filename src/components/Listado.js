import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from "axios";
import swAlert from '@sweetalert/with-react';
import login from '../img/spinner.gif';



function Listado(props) {
    // console.log(props);
    const [moviesList, setMoviesList] = useState([]);
    let token = sessionStorage.getItem('token');


    useEffect(() => {
        const endPoint = "https://api.themoviedb.org/3/discover/movie?api_key=1790a215c54973c15bdb35ff5b281ef0&language=es-ES&page=1";
        axios.get(endPoint)
            .then(response => {
                const apiData = response.data.results;
                setMoviesList(apiData);
                // console.log(typeof apiData);
            })
            .catch(error => {
                swAlert(<h2>Existen errores, intenta mas tarde</h2>)
            })
    }, [setMoviesList])
    // console.log(moviesList);
    // const history = useNavigate();
    //el efecto es paraque se ejecute apenas se monte el componente
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     console.log(token);
    //     if (token === null) {
    //         history('/');
    //     }
    // }, [history])
    return (

        <>
            {!token && <Navigate to="/" replace />}
            {!props.estado && <div className='f d-flex justify-content-center align-items-center' style={{ height: "100vh" }}  ><img src={login} className="img-fluid rounded" alt="movie poster" /></div>}

            {props.estado &&

                <>
                    <div className='row'>

                        <h2>Lo más popular</h2>
                        {moviesList.map((movies, idx) => {
                            return (
                                <>
                                    <div className="col-md-3 my-3" key={idx} style={{ color: 'black' }}>
                                        <div className="card" >
                                            {/* backdrop_path  &&  poster_path*/}
                                            <Link to={`/detalle?movieId=${movies.id}`}><img src={window.innerWidth >= 600 ? `https://image.tmdb.org/t/p/w500/${movies.poster_path}` : `https://image.tmdb.org/t/p/w500/${movies.backdrop_path}`} className="card-img-top img-fluid rounded" alt="Card image cap" /></Link>
                                            <button
                                                className='favorite-btn'
                                                onClick={props.addOrRemoveFromFavs}
                                                data-movie={movies.id}
                                            >💓</button>
                                            <div className="card-body">
                                                <Link to={`/detalle?movieId=${movies.id}`}><h5 className="card-title">{movies.title}</h5></Link>
                                                <p className="card-text">{movies.overview.substring(0, 100)}...</p>
                                                <Link to={`/detalle?movieId=${movies.id}`} className="btn btn-bg-color">Ver detalles</Link>

                                            </div>
                                        </div>

                                    </div>
                                </>
                            )
                        })}


                    </div>
                </>}
        </>

    )

}
export default Listado;
