import React from 'react';
import { Link } from 'react-router-dom';
export default () => {
  return (
    <div
      className="content-fluid"
      style={{
        display: 'flex',
        paddingTop: '5px'
      }}
    >
      <Link
        to="/client/add"
        style={{
          color: 'white',
          backgroundColor: '#FB2688',
          borderColor: '#FB2688'
        }}
        className="btn btn-block"
      >
        <i className="fas fa-plus" /> New Client
      </Link>
    </div>
  );
};
