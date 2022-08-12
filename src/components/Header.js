import { Link } from 'react-router-dom';
import { Nav, Navbar, NavLink } from "react-bootstrap"
// link hace refencia a la etiqueta href pero no se reflesca mi pagina spa
//components
import Buscador from './Buscador';
function Header(props) {
    let token = sessionStorage.getItem('token');
    return (


        <header className=' bg-dark'>
            <Navbar collapseOnSelect expand="sm" bg="dark " variant="dark" className='px-4 '>
                <Navbar.Toggle aria-controls="navbarScroll" data-bs-target="#navbarScroll" />
                <Link className='navbar-brand' to="/">WebSite-Movie</Link>
                <Navbar.Collapse id="navbarScroll">
                    <Nav className='d-flex justify-content-end' style={{ width: "100%" }}>

                        <NavLink eventKey="1"><Link className='nav-link' to="/">Home</Link></NavLink>
                        {props.estado &&
                            <>
                                <NavLink eventKey="2"><Link className='nav-link' to="/listado">Listado</Link></NavLink>

                                <NavLink eventKey="3"><Link className='nav-link' to="/favoritos">Favoritos</Link></NavLink>

                                <NavLink className="d-flex align-items-center" eventKey="4">
                                    <span className='text-success'>
                                        {props.favorites.length > 0 && <>Peliculas Favoritas:{props.favorites.length}</>}
                                    </span>
                                </NavLink>
                            </>
                        }
                        {props.estado && <Buscador readSearch={props.readSearch} />}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>


    )

}
export default Header;
