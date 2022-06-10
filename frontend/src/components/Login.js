import React from "react";
import './Login.css';
import user2 from './img/user2.png';
import axios from "axios";
import Cookies from 'universal-cookie';
const url = "https://servicio-autenticacion.herokuapp.com/login/admin/";

const cookies = new Cookies();
class Login extends React.Component {

    state = {
        form: {
            email: '',
            password: ''
        }
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
        console.log(this.state.form);
    }
    iniciarSesion = async () => {
        await axios.get(url, { params: { email: this.state.form.email, password: this.state.form.password} })
            .then(response => {
                console.log(response.data.data);
            })
            /*.then(response => {
                if (response.length > 0) {
                    var respuesta = response[0];
                    cookies.set('id', respuesta.id, { path: "/" });
                    cookies.set('alias', respuesta.alias, { path: "/" });
                    cookies.set('email', respuesta.email, { path: "/" });
                    alert(`Bienvenido ${respuesta.alias}`);
                    // window.location.href="./menu";
                } else {
                    alert('El correo o la contraseña no son correctos');
                    //window.location.href="./menu";
                }
            })*/
            .catch(error => {
                console.log(error);
            })
    }
    render() {
        return (
            <div>
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <div className="fadeIn first">

                            <br></br>
                            <img src={user2} width="100px" />
                            <br></br>
                            <br></br>
                        </div>
                        <form onClick={this.manejadorSubmit}>
                            <input type="text" className="fadeIn second" name="email" placeholder="Correo" onChange={this.handleChange} />
                            <input type="password" className="fadeIn third" name="password" placeholder="Contraseña" onChange={this.handleChange} />
                            <br></br>
                            <br></br>
                            <input type="submit" className="fadeIn fourth" value="Iniciar sesión" onClick={() => this.iniciarSesion()} />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;