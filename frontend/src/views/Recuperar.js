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
            nombre: '',
            username: '',
            email: '',
            estado: '',
            password: ''
        },
        error: false,
        errorMSsg: ""
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
    peticionPut = (id) => {
        axios.put("https://servicio-autenticacion.herokuapp.com/login/admin/" +id, this.state.form)
            .then(response => {
            }).catch(error => {
                this.setState({
                    error: true,
                    errorMSsg: "Correo electrónico erroneo"
                })
            })
    }
    metodoDelete = (id) => {
          this.peticionPut(id);
          window.alert('Contraseña actualizada con éxito');
          window.location.href = "./";
      }
      manejadorSubmit(e) {
        e.preventDefault();
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
                        <h4 className='h4'>Actualización de datos</h4>
                        <br></br>
                        <form onClick={this.manejadorSubmit}>
                            
                            <input type="text" className="fadeIn second" name="id" placeholder="ID de usuario" onChange={this.handleChange} value={form.id}/>
                            <input type="text" className="fadeIn second" name="nombre" placeholder="Nombre" onChange={this.handleChange}  value={form.nombre}/>
                            <input type="text" className="fadeIn second" name="username" placeholder="Nuevo Usuario"  onChange={this.handleChange} value={form.username}/>
                            <input type="text" className="fadeIn second" name="email" placeholder="Nuevo correo" onChange={this.handleChange}  value={form.email}/>
                            <input type="password" className="fadeIn third" name="password" placeholder="Nueva contraseña" onChange={this.handleChange} value={form.password} />
                            <input type="text" className="fadeIn second" name="estado" placeholder="Status" onChange={this.handleChange}  value={form.estado}/>
                            
                            <br></br>
                            <br></br>
                            <input type="submit" className="fadeIn fourth" value="Actualizar datos"  onClick={() => this.metodoDelete(form.id)} />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Recuperar;
