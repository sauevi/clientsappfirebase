import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spiner from '../layouts/Spiner';
import classnames from 'classnames';

/**
 * Class para los detalles del cliente
 */
class ClientDetail extends Component {
  render() {
    const { client } = this.props;
    if (client) {
      return (
        <div>
          <div className="row">
            <div
              className="col-sm-12 col-md-6 col-lg-12"
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
            <div className="container-fluid">
              <div
                className="card"
                style={{
                  borderColor: '#1298AE'
                }}
              >
                <h3
                  className="card-header"
                  style={{
                    backgroundColor: '#1298AE',
                    textAlign: 'center',
                    borderColor: '#1298AE',
                    color: 'white'
                  }}
                >
                  <i className="fas fa-user" style={{ color: 'white' }} />{' '}
                  {client.firstName} {client.lastName}
                </h3>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-6 col-md-8 col-lg-12">
                      <h4 style={{ color: '#1298AE' }}>
                        Client Id:{' '}
                        <span className="text-secondary">{client.id}</span>
                      </h4>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-12">
                      <h3 className="pull-right" style={{ color: '#1298AE' }}>
                        Balance:{' '}
                        <span
                          className={classnames({
                            'text-danger': client.balance > 0,
                            'text-success': client.balance === 0
                          })}
                        >
                          ${parseFloat(client.balance).toFixed(2)}
                        </span>
                      </h3>
                    </div>
                  </div>
                </div>
                <div
                  className="card-footer"
                  style={{ backgroundColor: 'white', borderColor: '#1298AE' }}
                >
                  <Link
                    to={`/client/edit/${client.id}`}
                    className="btn btn-dark"
                    style={{
                      backgroundColor: '#FB2688',
                      borderColor: '#FB2688',
                      float: 'left'
                    }}
                  >
                    Edit profile <i className="far fa-edit" />
                  </Link>
                  <button
                    className="btn"
                    style={{
                      backgroundColor: 'white',
                      borderColor: '#FB2688',
                      color: '#FB2688',
                      float: 'right'
                    }}
                  >
                    Delete <i className="fas fa-trash" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <footer
            className="page-footer fixed-bottom pt-4"
            style={{
              paddingBottom: '5rem'
            }}
          >
            <div className="container-fluid">
              <ul className="list-unstyled text-right">
                <li className="list-inline-item" />
                <li className="list-inline-item" />
              </ul>
            </div>
          </footer>
        </div>
      );
    } else {
      return <Spiner />;
    }
  }
}

ClientDetail.protoTypes = {
  firestore: PropTypes.object.isRequired
};

/**
 * De esta forma estamos cogiendo de las propiedads, en la colleccion de clientes y se guarda como cliente
 * aparte en el documento, se coge el id que viene desde la url, despues de tener estos valores lo que se realiza
 * es que se conecta a la firestore, y se coger el order, de ese order capturamos el valor de cliente y el valor
 * del cliente que esta en el valor 0
 */
export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetail);
