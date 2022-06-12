import '../css/App.css'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Component } from 'react';
import '../css/Login.css';

class Recuperar extends Component {

    state = {
        data: [],
        form: {
            id: '',
            email: '',
            password: ''
        }
    }

    handleChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        //console.log(this.state.form);
    }
    peticionPut = () => {
        axios.put("https://servicio-autenticacion.herokuapp.com/login/admin/" + this.state.form.id, this.state.form)
            .then(response => {
                window.alert('Contraseña actualizada con éxito');
                window.location.href = "./";
            }).catch(error => {
                this.setState({
                    error: true,
                    errorMSsg: "Correo electrónico erroneo"
                })
            })
    }


    render() {
        const { form } = this.state;
        return (
            <div>
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <div className="fadeIn first">
                            <br></br>
                            <br></br>
                        </div>
                        <h4 className='h4'>Recuperar contraseña</h4>
                        <br></br>
                        <form onClick={this.manejadorSubmit}>
                            <input type="text" className="fadeIn second" name="email" placeholder="Correo" onChange={this.handleChange} value={form.email}/>
                            <input type="password" className="fadeIn third" name="password" placeholder="Nueva contraseña" onChange={this.handleChange} value={form.password} />
                            <br></br>
                            <br></br>
                            <input type="submit" className="fadeIn fourth" value="Actualizar contraseña"  onClick={() => this.peticionPut()} />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Recuperar;