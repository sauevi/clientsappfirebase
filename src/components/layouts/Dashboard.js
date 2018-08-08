import React from 'react';
import Clients from '../clients/Clients';
import Sidebar from '../layouts/Sidebar';

export default () => {
  return (
    <div className="row">
      <div className="col-sm-8 col-md-10 col-lg-10">
        <Clients />
      </div>
      <div className="col-sm-4 col-md-2 col-lg-2">
        <Sidebar />
      </div>
    </div>
  );
};
