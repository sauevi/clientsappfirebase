import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//propiedades
import PropTypes from 'prop-types';
//componenetes para redux y firebase
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
//otros componentes
import Spinner from '../layouts/Spiner';
class Clients extends Component {
  state = {
    totalOwed: null
  };

  //coger todos los balances para ver el total
  static getDerivedStateFromProps(props, state) {
    const { clients } = props;
    if (clients) {
      //agregar balances
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);

      return { totalOwed: total };
    }
    return null;
  }
  render() {
    //cargamos nuestras propiedades de los props
    const { clients } = this.props;
    const { totalOwed } = this.state;
    //se valida si clientes existe para saver si cargamos este dom u otro
    if (clients) {
      return (
        <div className="container-fluid">
          <div className="container-fluid">
            <h2>
              <div
                className="container-fluid"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  color: '#1298AE'
                }}
              >
                <i className="fas fa-users" style={{ color: '#1298AE' }} />{' '}
                Clients
              </div>
            </h2>
          </div>
          <div className="table-responsive-sm">
            <table className="table">
              <thead
                className="thead-inverse"
                style={{
                  backgroundColor: '#1298AE',
                  color: 'white'
                }}
              >
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Balance</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {clients.map(client => (
                  <tr key={client.id}>
                    <td>
                      {client.firstName} {client.lastName}
                    </td>
                    <td>{client.email}</td>
                    <td style={{ textAlign: 'center' }}>
                      ${parseFloat(client.balance).toFixed(2)}
                    </td>
                    <td>
                      <Link
                        to={`/client/${client.id}`}
                        className="btn btn-secondary btn-sm"
                        style={{
                          backgroundColor: '#0AADC8',
                          borderColor: '#0AADC8'
                        }}
                      >
                        Details <i className="fas fa-arrow-circle-right" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className="container-fluid"
            style={{
              marginTop: '10px',
              display: 'flex',
              justifyContent: 'flex-end',
              color: '#1298AE'
            }}
          >
            <h5>
              Total Balance:{' '}
              <span
                style={{
                  color: '#FB2688'
                }}
              >
                ${parseFloat(totalOwed).toFixed(2)}
              </span>
            </h5>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

// propiedades
Clients.protoTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};

//de esta forma se realiza el mateo para poder cargar los clientes
//desde firestore.
export default compose(
  firestoreConnect([
    {
      collection: 'clients'
    }
  ]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);
