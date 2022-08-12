import React, { useEffect, useState } from 'react';
import axios from "axios";
import swAlert from '@sweetalert/with-react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';

function Login(props) {
    const [windowHeight, setWindowHeight] = useState(0);
    const history = useNavigate();
    console.log(history);
    // let windowHeight = window.innerHeight;
    // e.preventDefault(); lo que me sirve es que no recargue mi pagina "ajax"
    useEffect(() => {
        let readHeader = document.querySelector("header");
        let readfooter = document.querySelector("footer");
        setWindowHeight(window.innerHeight);
        let resultHeight = windowHeight - readHeader.clientHeight - readfooter.clientHeight - 25;
        document.querySelector(".initHeigth").style.height = `${resultHeight}px`;
        // console.log(readHeader.clientHeight);
        // console.log(readfooter.clientHeight);
        // console.log(windowHeight);
        console.log(resultHeight);
    }, [windowHeight])
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
            Swal.fire({
                title: "Los campos no pueden estar vacios",
                icon: "error",
                // showCancelButton: true,
                confirmButtonColor: "#9bc59d",
                // cancelButtonColor: "#212738",
                confirmButtonText: "Aceptar",
                // cancelButtonText: "Cancelar"
            });
            return; //solo se ejecuta esta si estan vacios
        }
        if (email !== '' && !regexEmail.test(email)) {
            Swal.fire({
                title: "Debes escribir una direccion de correo valida",
                icon: "error",
                // showCancelButton: true,
                confirmButtonColor: "#9bc59d",
                // cancelButtonColor: "#212738",
                confirmButtonText: "Aceptar",
                // cancelButtonText: "Cancelar"
            });
            return;
        }
        if (email !== sessionStorage.getItem('email') || password !== sessionStorage.getItem('password')) {
            Swal.fire({
                title: "Credenciales Invalidas",
                icon: "error",
                // showCancelButton: true,
                confirmButtonColor: "#9bc59d",
                // cancelButtonColor: "#212738",
                confirmButtonText: "Aceptar",
                // cancelButtonText: "Cancelar"
            });
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
        Swal.fire({
            title: "Ingresastes Correctamente",
            // html: <i>Disfruta de lo que te gusta</i>,
            icon: "success",
            confirmButtonColor: "#9bc59d",
            confirmButtonText: "Aceptar"
        });
        sessionStorage.setItem('token', '1');
        props.readApp();
        history('/listado');
    }
    const token = sessionStorage.getItem('token');

    return (
        <>
            <div className="initHeigth" >
                {token && <Navigate to="/listado" replace />}
                <div className="row">
                    <div className="col-6 offset-3">
                        <h2 className="mb-3">WebSite-Movie</h2>
                        <form onSubmit={submitHandler}>
                            <label className="form-label d-block mt-2">
                                <span>Correo Electronico</span><br />
                                <input className="form-control" type="text" placeholder="Email" name="email" required />
                            </label>
                            <label className="form-label d-block mt-2">
                                <span>Contraseña</span><br />
                                <input className="form-control" type="password" placeholder="Password" name="password" password="password" required />
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
        </>
    )
}
export default Login;