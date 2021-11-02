import React from 'react';
import OrderList from './orders/OrderList';

function App() {
  return (
    <div className="container"> 
      <div className="row"> 
        <div className="col-sm-12"> 
          <div className="page-header"> 
            <h1>Trending Order App</h1>
          </div>
        </div>
      </div>

      <div className="row"> 
        <div className="col-sm-12"> 
          <OrderList />
        </div>
      </div>
    </div>
  );
}

export default App;
