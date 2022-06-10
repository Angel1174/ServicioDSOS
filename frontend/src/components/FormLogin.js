import React, { useState } from 'react';
import './Login.css';
import user2 from './img/user2.png';



export const FormLogin = (props = {}) => {
    const [data, setData] = useState({
        usuario: '',
        contraseña: '',
        todos: []
    });

    const handlerChangeUsuario = (event) => {
        const value = event.target.value;
        setData({ ...data, usuario: value });//Crea el objeto en el estado, lo que reciba lo almacena donde debe
    };

    const handlerChangeContraseña = (event) => {
        const value = event.target.value;
        setData({ ...data, contraseña: value });
    };

    const handlerOnSubmit = (event) => {
        event.preventDefault();
        const { usuario, contraseña, todos } = data;

        const note = [{ usuario, contraseña }];//crea una nota dentro del arreglo
        const newTodos = [...todos, note];//esto une los arreglos
        console.log(newTodos);
        setData({ ...data, todos: newTodos })//inserta la data
    }

    return (
        <div>
            <div className="containerPrincipal">
                <div className="containerSecundario">
                    <h4 className='h4'>Bienvenido</h4>
                    <div className="form-group">
                        <img src={user2} className="img"></img>
                        <br />
                        <br />
                        <input
                            type="text"
                            className="input"
                            name="username"
                            onChange={handlerChangeUsuario}
                            placeholder="Usuario"
                        />
                        <br />
                        <br />
                        <input
                            type="password"
                            className="input"
                            name="password"
                            onChange={handlerChangeContraseña}
                            placeholder="Contraseña"
                        />
                        <br />
                        <br />
                        <div >
                            <p>
                                <label>
                                    <input type="checkbox" className='checkmark' />
                                    <span>Recordarme</span>
                                </label>
                            </p>
                        </div>
                     
                        <button className="btn btn-primary" onClick={handlerOnSubmit}>Iniciar Sesión</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


