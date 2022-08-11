import axios from "axios";
import swAlert from '@sweetalert/with-react';
import { useNavigate, Link, Navigate } from 'react-router-dom';

function Login(props) {
    const history = useNavigate();
    console.log(history);
    // e.preventDefault(); lo que me sirve es que no recargue mi pagina "ajax"

    const submitHandler = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email === '' || password === '') {
            swAlert(
                <h2>Los campos no pueden estar vacios</h2>
            );
            // console.log('Los campos no pueden estar vacios');
            return; //solo se ejecuta esta si estan vacios
        }
        if (email !== '' && !regexEmail.test(email)) {
            swAlert(
                <h2>Debes escribir una direccion de correo valida</h2>
            );
            // console.log('Debes escribir una direccion de correo valida');
            return;
        }
        if (email !== 'challenge@alkemy.org' || password !== 'react') {
            swAlert(
                <h2>Credenciales Invalidas</h2>
            );
            // console.log('Credenciales Invalidas');
            return;
        }
        console.log('estamos listo para enviar la informacion');
        console.log(email, password);

        //consulto a una api
        axios
            .post('http://challenge-react.alkemy.org', { email, password })//axios es para enviar una petion de tipo post
            .then(res => {
                swAlert(
                    <h2>Ingresastes Correctamente</h2>
                );
                // console.log(res.data);
                const tokenRecibido = res.data.token;
                sessionStorage.setItem('token', tokenRecibido);
                sessionStorage.setItem('nombre', 'Jorge Jimenez');
                sessionStorage.setItem('Cargo', 'Desarrollador Web');
                // <Link to="/listado" />
                history('/listado');

            })
    }
    const token = sessionStorage.getItem('token');

    return (
        <>
            {token && <Navigate to="/listado" replace />}
            <div className="row">
                <div className="col-6 offset-3">
                    <h2>Formulario Login</h2>
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
                            className="btn btn-success mt-2"
                            onClick={props.readApp}
                        >Ingresar</button>

                    </form>

                </div>
            </div>
        </>
    )
}
export default Login;