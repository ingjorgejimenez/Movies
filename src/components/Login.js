import axios from "axios";
import swAlert from '@sweetalert/with-react';
import { useNavigate, Link, Navigate } from 'react-router-dom';

function Login(props) {
    const history = useNavigate();
    console.log(history);
    // e.preventDefault(); lo que me sirve es que no recargue mi pagina "ajax"

    function registerClick() {
        history('/registro');
    }
    const submitHandler = e => {
        e.preventDefault()
        sessionStorage.setItem('email', 'ing_jorgejimenez@outlook.com');
        sessionStorage.setItem('password', 'react');
        if (localStorage.getItem('email') && localStorage.getItem('password')) {
            sessionStorage.setItem('email', localStorage.getItem('email'));
            sessionStorage.setItem('password', localStorage.getItem('password'));
        }
        const email = e.target.email.value;
        const password = e.target.password.value;
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email === '' || password === '') {
            swAlert(
                <h2>Los campos no pueden estar vacios</h2>
            );
            return; //solo se ejecuta esta si estan vacios
        }
        if (email !== '' && !regexEmail.test(email)) {
            swAlert(
                <h2>Debes escribir una direccion de correo valida</h2>
            );
            return;
        }
        if (email !== sessionStorage.getItem('email') || password !== sessionStorage.getItem('password')) {
            swAlert(
                <h2>Credenciales Invalidas</h2>
            );
            // console.log('Credenciales Invalidas');
            return;
        }
        console.log('estamos listo para enviar la informacion');
        console.log(typeof (email), password);

        //consulto a una api
        // axios
        //     .post('http://challenge-react.alkemy.org', { email, password })//axios es para enviar una petion de tipo post
        //     .then(res => {
        //         swAlert(
        //             <h2>Ingresastes Correctamente</h2>
        //         );
        //         // console.log(res.data);
        //         const tokenRecibido = res.data.token;
        //         sessionStorage.setItem('token', tokenRecibido);
        //         sessionStorage.setItem('nombre', 'Jorge Jimenez');
        //         sessionStorage.setItem('Cargo', 'Desarrollador Web');
        //         // <Link to="/listado" />
        //         history('/listado');

        //     })
        swAlert(
            <h2>Ingresastes Correctamente</h2>
        );
        sessionStorage.setItem('token', '1');
        history('/listado');
    }
    const token = sessionStorage.getItem('token');

    return (
        <div style={{ height: "77vh" }}>
            {token && <Navigate to="/listado" replace />}
            <div className="row">
                <div className="col-6 offset-3">
                    <h2 className="mb-3">WebSite-Movie</h2>
                    <form onSubmit={submitHandler}>
                        <label className="form-label d-block mt-2">
                            <span>Correo Electronico</span><br />
                            <input className="form-control" type="text" placeholder="email" name="email" />
                        </label>
                        <label className="form-label d-block mt-2">
                            <span>Contraseña</span><br />
                            <input className="form-control" type="password" name="password" password="password" />
                        </label>
                        <button
                            type="submit"
                            className="btn btn-bg-color mt-2 mb-2"
                            onClick={props.readApp}
                        >Ingresar</button>
                        <p>¿No tienes una cuenta? <span onClick={() => registerClick()} className="registrar">Regístrate</span></p>

                    </form>

                </div>
            </div>
        </div>
    )
}
export default Login;