import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spiner from '../layouts/Spiner';
import { Link } from 'react-router-dom';
import { throws } from 'assert';
/**
 * Componente para la edicion de un cliente, se utiliza defaulValue, en vez de value, ya que se guarda en las propiedades
 */
class EditClient extends Component {
  constructor(props) {
    super(props);
    // crear las referencias
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();
    const { client, firestore } = this.props;

    //update client
    const updClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      balance:
        this.balanceInput.current.value === ''
          ? 0
          : this.balanceInput.current.value
    };

    //update client en firestore
    firestore
      .update({ collection: 'clients', doc: client.id }, updClient)
      .then(() => this.props.history.push('/'))
      .catch(throws);
  };

  render() {
    const { client } = this.props;

    if (client) {
      return (
        <div>
          <div className="row">
            <div
              className="col-sm-12 col-md-6 col-lg-6"
              style={{ paddingBottom: '10px' }}
            >
              <Link
                to="/"
                className="btn btn-link"
                style={{ color: '#0AADC8' }}
              >
                <i className="fas fa-arrow-circle-left" /> Back to Dasboard
              </Link>
            </div>
          </div>
          <div className="card" style={{ borderColor: '#1298AE' }}>
            <div
              className="card-header text-center"
              style={{ backgroundColor: '#1298AE', color: 'white' }}
            >
              <strong>Edit CLient</strong>
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
                      ref={this.firstNameInput}
                      defaultValue={client.firstName}
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
                      ref={this.lastNameInput}
                      defaultValue={client.lastName}
                    />
                  </div>
                </div>
                <div className="form-group" style={{ paddingTop: '15px' }}>
                  {
                    //guardamos los valores en una propiedad para ello usamos el ref
                  }
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    required
                    ref={this.emailInput}
                    defaultValue={client.email}
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    minLength="10"
                    ref={this.phoneInput}
                    defaultValue={client.phone}
                    placeholder="Phone Number"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="balance"
                    ref={this.balanceInput}
                    defaultValue={client.balance}
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
                      defaultValue="Submit"
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
    } else {
      return <Spiner />;
    }
  }
}

EditClient.protoTypes = {
  firestore: PropTypes.object.isRequired,
  client: PropTypes.object
};

/*
 * de la siguiente manera podemos capturar los parametros de una URL
 * props.match.params.NOMBRE_DE_LA_VARIABLE
 */
export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(EditClient);
