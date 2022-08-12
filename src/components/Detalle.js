import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import login from '../img/spinner.gif';

function Detalle() {
    const [movie, setMovie] = useState(null);
    const [video, setVideo] = useState(null);
    const [pelicula, setPelicula] = useState('');
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const token = sessionStorage.getItem('token');
    let query = new URLSearchParams(window.location.search);
    let movieId = query.get('movieId')

    useEffect(() => {
        console.log(movieId);
        const endPointVideo = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=1790a215c54973c15bdb35ff5b281ef0&language=es-ES`
        const endPoint = `https://api.themoviedb.org/3/movie/${movieId}?api_key=1790a215c54973c15bdb35ff5b281ef0&language=es-ES`;
        axios.get(endPoint)
            .then(response => {
                const movieData = response.data;
                setMovie(movieData);
                console.log(movieData);
            })
            .catch(error => {
                // console.log(error);
                console.log('Existen errores, intenta mas tarde');
            })
        axios.get(endPointVideo)
            .then(response => {
                const videoData = response.data;
                // console.log(videoData);
                setVideo(videoData);

            })
            .catch(error => {
                console.log('Existen errores, intenta mas tarde');
            })

    }, [movieId])

    function handleClick(res) {
        setPelicula(res);
        handleShow();
    }

    return (
        <>
            {/* Short circuit render */}
            {!token && <Navigate to="/" replace />}
            {!movie && <div className='f d-flex justify-content-center align-items-center' style={{ height: "100vh" }}  ><img src={login} className="img-fluid rounded" alt="movie poster" /></div>}

            {
                movie &&
                <>

                    <Modal show={showModal} onHide={handleClose}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        dialogClassName='movie-modal'
                    >
                        <Modal.Header closeButton>
                            <Modal.Title className='text-uppercase'>{movie.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="movie-content">
                            <div className='fonts-content'>
                                <iframe
                                    width={935}
                                    height={521}
                                    src={`https://www.youtube.com/embed/${pelicula}`}
                                    title="YouTube video player"
                                    frameBorder={0}
                                    allow="accelerometer; 
                                     autoplay;
                                      clipboard-write;
                                       encrypted-media;
                                       gyroscope; 
                                       picture-in-picture"
                                    allowFullScreen

                                />


                            </div>
                        </Modal.Body>

                    </Modal>

                    <div div className='section'>
                        <div className='row'>
                            <div className='col-md-4'>
                                <Link to={`/detalle?movieId=${movie.id}`}><img src={window.innerWidth >= 600 ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} className="img-fluid rounded img-resp" alt="movie poster" /></Link>
                            </div>
                            <div className='col-md-8'>
                                <h2 className='mb-2 ms-1'>{movie.title}</h2>
                                <h5>Fecha de estreno:{movie.release_date}</h5>
                                <h5>Reseña:</h5>
                                <p>{movie.overview}</p>
                                <h5>Rating:{movie.vote_average}</h5>
                                <h5>Generos:</h5>
                                <ul>
                                    {movie.genres.map(oneGenre => <li key={oneGenre.id}>{oneGenre.name}</li>)}
                                </ul>
                                <div className='row'>
                                    {video &&
                                        <>
                                            {video.results.map(oneGenre => <div className='col-12 mb-3'><span className='btn-reporudcir' onClick={() => handleClick(oneGenre.key)} key={oneGenre.id}>{oneGenre.type === "Trailer" ? <><span>▶</span>Reproducir Trailer</> : <><span>▶</span>Reproducir Pelicula</>}</span></div>)}
                                        </>
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </>
            }
        </>
    )
}
export default Detalle;