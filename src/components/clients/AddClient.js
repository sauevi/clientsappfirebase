import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//propiedades
import PropTypes from 'prop-types';
//agregar a firebase
//import { compose } from 'redux';
//import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class AddClient extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: ''
  };

  //leer los input
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //enviar data
  onSubmit = e => {
    e.preventDefault();
    //nuevo cliente
    const newClient = this.state;
    const { firestore, history } = this.props;
    //manejar el balance
    if (newClient.balance === '') {
      newClient.balance = '0';
    }
    /**
     * para agregar al firestore, se utiliza el metodo "add" del mismo, para ello se debe especificar
     * la colleccion a la cual se esta agregando y despues enviar lo que se agrega, ya que nos da una respuesta
     * realizamos una re-direccion
     */
    firestore
      .add({ collection: 'clients' }, newClient)
      .then(() => history.push('/'));
  };

  render() {
    return (
      <div>
        <div className="row">
          <div
            className="col-sm-12 col-md-6 col-lg-6"
            style={{ paddingBottom: '10px' }}
          >
            <Link to="/" className="btn btn-link" style={{ color: '#0AADC8' }}>
              <i className="fas fa-arrow-circle-left" /> Back to Dasboard
            </Link>
          </div>
        </div>
        <div className="card" style={{ borderColor: '#1298AE' }}>
          <div
            className="card-header text-center"
            style={{ backgroundColor: '#1298AE', color: 'white' }}
          >
            <strong>Add CLient</strong>
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-row">
                <div
                  className="col-sm-12 col-md-6 col-lg-6"
                  style={{ paddingTop: '15px' }}
                >
                  <input
                    placeholder="First Name"
                    type="text"
                    className="form-control"
                    name="firstName"
                    minLength="2"
                    required
                    onChange={this.onChange}
                    value={this.state.firstName}
                  />
                </div>
                <div
                  className="col-sm-12 col-md-6 col-lg-6"
                  style={{ paddingTop: '15px' }}
                >
                  <input
                    placeholder="Last Name"
                    type="text"
                    className="form-control"
                    name="lastName"
                    minLength="2"
                    required
                    onChange={this.onChange}
                    value={this.state.lastName}
                  />
                </div>
              </div>
              <div className="form-group" style={{ paddingTop: '15px' }}>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  required
                  onChange={this.onChange}
                  value={this.state.email}
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  minLength="10"
                  onChange={this.onChange}
                  value={this.state.phone}
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="balance"
                  onChange={this.onChange}
                  value={this.state.balance}
                  placeholder="Balance"
                />
              </div>
              <div
                className="row"
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                <div className="col-sm-12 col-md-12 col-lg-2">
                  <input
                    value="Submit"
                    type="submit"
                    className="btn btn-primary btn-block"
                    style={{
                      backgroundColor: '#FB2688',
                      borderColor: '#FB2688'
                    }}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddClient.prototypes = {
  firestore: PropTypes.object.isRequired
};

//se hace de esta forma ya que no estamos objetiendo ninguna data
//desde firestore
export default firestoreConnect()(AddClient);
