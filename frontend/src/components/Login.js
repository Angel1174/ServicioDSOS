import React from "react";
import './Login.css';
import user2 from './img/user2.png';
import axios from "axios";
import { NavbarComponent } from './NavbarComponent';
class Login extends React.Component {

    state = {
        form: {
            "usernameOrEmail": "",
            "password": ""
        },
        error: false,
        errorMSsg: ""
    }

    manejadorSubmit(e) {
        e.preventDefault();
    }

    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        //console.log(this.state.form);
    }
    
    iniciarSesion = async () => {
        axios.post("https://servicio-autenticacion.herokuapp.com/login/auth", this.state.form)
            .then(response => {
                if (response.data.mesage === "Ok") {
                    alert("Bienvenido ");
                    window.location.href = "./usuarios";
                } else {
                    this.setState({
                        error: true,
                        errorMSsg: "Credenciales incorrectas"
                    })
                }
            }).catch(error => {
                this.setState({
                    error: true,
                    errorMSsg: "Credenciales incorrectas"
                })
            })
    }
    render() {
        return (
            <div>
                <NavbarComponent></NavbarComponent>
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <div className="fadeIn first">

                            <br></br>
                            <img src={user2} width="100px" />
                            <br></br>
                            <br></br>
                        </div>
                        <form onClick={this.manejadorSubmit}>
                            <input type="text" className="fadeIn second" name="usernameOrEmail" placeholder="Correo/Usuario" onChange={this.handleChange} />
                            <input type="password" className="fadeIn third" name="password" placeholder="Contraseña" onChange={this.handleChange} />
                            <br></br>
                            <br></br>
                            <input type="submit" className="fadeIn fourth" value="Iniciar sesión" onClick={() => this.iniciarSesion()} />
                        </form>
                        {this.state.error === true &&
                            <div className="alert alert-danger" role="alert">
                                {this.state.errorMSsg}
                            </div>
                        }


                    </div>
                </div>
            </div>
        );
    }
}
export default Login;
