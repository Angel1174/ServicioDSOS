import './App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Component } from 'react';
import { NavbarComponent } from './NavbarComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const url = "https://servicio-autenticacion.herokuapp.com/login/admin/";

class Principal extends Component {

  state = {
    data: [],
    modalInsertar: false,//crear
    modalInsertar2: false,//editar
    form: {
      id: '',
      alias: '',
      email: '',
      password: '',
      status: '',
      tipoModal: ''
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
  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  }

  modalInsertar2 = () => {
    this.setState({ modalInsertar2: !this.state.modalInsertar2 });
  }

  peticionGet = () => {
    axios.get(url).then(
      response => {
        this.setState({ data: response.data.data });
      }).catch(error => {
        console.log(error.message);
      })
  }

  peticionPost = async () => {
    delete this.state.form.id;
    await axios.post(url, this.state.form).then(response => {
      this.modalInsertar();
      this.peticionGet();
    }).catch(error => {
      console.log(error.message);
    })
  }
  peticionPut = () => {
    axios.put(url + this.state.form.id, this.state.form).then(response => {
      this.modalInsertar2();
      this.peticionGet();
    })
  }
  seleccionarUsuario = (usuario) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: usuario.id,
        alias: usuario.alias,
        email: usuario.email,
        password: usuario.password,
        status: usuario.status
      }
    })
  }
  removeUsuario = (id) => {
    fetch("https://servicio-autenticacion.herokuapp.com/login/admin/" + id, {
      method: 'DELETE'
    })
      .then(res => res.json())

  }
  metodoDelete = (id) => {
    var resultado = window.confirm('¿Estás seguro de eliminar el usuario?');
    if (resultado === true) {
      this.removeUsuario(id);
      window.alert('Usuario eliminado correctamente');
      this.peticionGet();
    } else {
      return 0;
    }

  }
  //Ciclo de vida
  componentDidMount() {
    this.peticionGet();
  }

  render() {
    const { form } = this.state;

    return (
      <div>
        <NavbarComponent></NavbarComponent>
        <div className="App" >
          <br />
          <center>
            <button className='btn btn-primary' onClick={() => { this.modalInsertar() }}>Registrar nuevo usuario </button>
          </center>
          <br /><br />
          <center>
            <table className=" table-dark" >
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Usuario</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Contraseña</th>
                  <th scope="col">Status</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map(usuario => {
                  return (
                    <tr className="bg-primary">
                      <td align="center">{usuario.id}</td>
                      <td align="center">{usuario.alias}</td>
                      <td align="center">{usuario.email}</td>
                      <td align="center">{usuario.password}</td>
                      <td align="center">{usuario.status}</td>
                      <td>
                        <button type="button" className="btn btn-success" onClick={() => { this.seleccionarUsuario(usuario); this.modalInsertar2() }}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>
                        &nbsp;&nbsp;&nbsp;
                        <button type="button" className="btn btn-danger" onClick={() => this.metodoDelete(usuario.id)} ><FontAwesomeIcon icon={faTrashAlt} /></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </center>
          {
          }
          <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader>
              Registro de Usuario
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <input className="form-control" placeholder='Usuario' type="text" name="alias" id="alias" required onChange={this.handleChange} value={form.alias}/>
                <br />
                <input className="form-control" placeholder='Correo' type="text" name="email" id="email" required onChange={this.handleChange} value={form.email} />
                <br />
                <input className="form-control" placeholder='Contraseña' type="password" name="password" required id="password" onChange={this.handleChange} value={form.password} />
                <br />
                <input className="form-control" placeholder='Status' type="status" name="status" id="status"  required onChange={this.handleChange} value={form.status} />
              </div>
            </ModalBody>

            <ModalFooter>
              <button className="btn btn-success" onClick={() => this.peticionPost()}>
                Insertar
              </button>
              &nbsp;&nbsp;&nbsp;
              <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.modalInsertar2}>
            <ModalHeader>
              Actualización de Usuario
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <input className="form-control" placeholder='Usuario' type="text" name="alias" id="alias" onChange={this.handleChange} value={form ? form.alias : ''} />
                <br />
                <input className="form-control" placeholder='Correo' type="text" name="email" id="email" disabled onChange={this.handleChange} value={form ? form.email : ''} />
                <br />
                <input className="form-control" placeholder='Contraseña' type="password" name="password" id="password" disabled onChange={this.handleChange} value={form ? form.password : ''} />
                <br />
                <input className="form-control" placeholder='Status' type="status" name="status" id="status" onChange={this.handleChange} value={form.status} />
                
              </div>
            </ModalBody>

            <ModalFooter>
              <button className="btn btn-primary" onClick={() => this.peticionPut()}>
                Actualizar
              </button>
              &nbsp;&nbsp;&nbsp;
              <button className="btn btn-danger" onClick={() => this.modalInsertar2()}>Cancelar</button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Principal;