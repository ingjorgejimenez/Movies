import React, { useEffect, useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import swAlert from '@sweetalert/with-react';
import Swal from "sweetalert2";

function Registro() {
    const history = useNavigate();
    let windowHeight = window.innerHeight;
    useEffect(() => {
        let readHeader = document.querySelector("header");
        let readfooter = document.querySelector("footer");
        let resultHeight = windowHeight - readHeader.clientHeight - readfooter.clientHeight - 25;
        document.querySelector(".initHeigth").style.height = `${resultHeight}px`;
        // console.log(readHeader.clientHeight);
        // console.log(readfooter.clientHeight);
        // console.log(windowHeight);
        // console.log(resultHeight);
    }, [windowHeight])
    const submitHandler = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
        <div className="initHeigth" >
            {token && <Navigate to="/listado" replace />}
            <div className="row">
                <div className="col-6 offset-3">
                    <h2 className="mb-3">WebSite-Movie Registro</h2>
                    <form onSubmit={submitHandler}>
                        <label className="form-label d-block mt-2">
                            <span>Nombre y Apellido</span><br />
                            <input className="form-control" type="text" placeholder="Nombre y Apellido" name="nombre" required />
                        </label>
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
                        >Registar</button>

                    </form>

                </div>
            </div>

        </div>
    );

}
export default Registro;
