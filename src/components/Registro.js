import React, { Component } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import swAlert from '@sweetalert/with-react';
import Swal from "sweetalert2";

function Registro() {
    const history = useNavigate();
    const submitHandler = e => {
        e.preventDefault()
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
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        Swal.fire({
            title: "Registro Exitoso",
            icon: "success",
            confirmButtonColor: "#9bc59d",
            confirmButtonText: "Aceptar"
        });
        history('/');
    }
    const token = sessionStorage.getItem('token');
    return (
        <div style={{ height: "77vh" }} >
            {token && <Navigate to="/listado" replace />}
            <div className="row">
                <div className="col-6 offset-3">
                    <h2 className="mb-3">WebSite-Movie Registro</h2>
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
                        >Registar</button>

                    </form>

                </div>
            </div>

        </div>
    );

}
export default Registro;
