import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import swAlert from '@sweetalert/with-react';
import login from '../img/spinner.gif';

function Resultados(props) {
    // const [keyword, setKeyword] = useState('');
    const [estado, setEstado] = useState(null);
    const [moviesResults, setMoviesResults] = useState([]);
    let query = new URLSearchParams(window.location.search);
    let keyword = query.get("keyword");
    // let result = query.get('keyword');
    // setKeyword(result);  

    // https://api.themoviedb.org/3/search/movie?api_key=1790a215c54973c15bdb35ff5b281ef0&language=es-ES&page=1&include_adult=false&query=spider
    useEffect(() => {
        if (props.estadoSearch) {
            // console.log('estoy en efecto');
            setEstado(props.estadoSearch);
        }

        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=1790a215c54973c15bdb35ff5b281ef0&language=es-ES&page=1&include_adult=false&query=${keyword}`;
        axios.get(endPoint)
            .then(response => {
                const movieArray = response.data.results;
                if (movieArray.length < 1) {
                    swAlert(<h5>No existen resultados</h5>)
                }
                setMoviesResults(movieArray);
            })
            .catch(error => {
                // console.log(error);
                swAlert(<h5>Existen errores, intenta mas tarde Resulado</h5>)
            })
    }, [keyword, props.estadoSearch])
    // console.log(moviesResults);

    return (
        <>
            {!estado && <div className='f d-flex justify-content-center align-items-center' style={{ height: "100vh" }}  ><img src={login} className="img-fluid rounded" alt="movie poster" /></div>}

            {estado &&
                <>
                    <h1>Buscastes: <em>{keyword}</em></h1>
                    <div className='row'>
                        {moviesResults.map((movies, idx) => {
                            return (
                                <div className="col-md-4 my-3" key={idx} style={{ color: 'black' }}>
                                    <div className="card my-4" >
                                        <Link to={`/detalle?movieId=${movies.id}`}><img className="card-img-top img-responsive" src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`} alt="Card image cap" /></Link>
                                        <div className="card-body">
                                            <h5 className="card-title">{movies.title}</h5>
                                            <p className="card-text">{movies.overview.substring(0, 100)}...</p>
                                            <Link to={`/detalle?movieId=${movies.id}`} className="btn btn-primary">Ver detalles</Link>

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
export default Resultados;