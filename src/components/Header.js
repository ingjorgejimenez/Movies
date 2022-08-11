import { Link } from 'react-router-dom';
// link hace refencia a la etiqueta href pero no se reflesca mi pagina spa
//components
import Buscador from './Buscador';
function Header(props) {

    return (

        <header className=' bg-dark'>
            <nav className='navbar navbar-expand-lg navbar-dark px-4'>
                <Link className='navbar-brand' to="/">WebSite-Movie</Link>
                <button className='navbar-toggler' type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" arial-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className='nav-link' to="/">Home</Link>
                        </li>
                        {props.estado &&
                            <>
                                <li className="nav-item">
                                    <Link className='nav-link' to="/listado">Listado</Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link className='nav-link' to="/contacto">Contacto</Link>
                                </li> */}
                                <li className="nav-item">
                                    <Link className='nav-link' to="/favoritos">Favoritos</Link>
                                </li>
                                <li className="nav-item d-flex align-items-center">
                                    <span className='text-success'>
                                        {props.favorites.length > 0 && <>Peliculas en Favoritos:{props.favorites.length}</>}
                                    </span>
                                </li>
                            </>
                        }
                    </ul>
                </div>
                {props.estado && <Buscador readSearch={props.readSearch} />}
            </nav>
        </header>


    )

}
export default Header;
