import React from 'react';

const OrderDetail = props => {
    const { itemName, recentPurchase, lastestPurchaseTime } = props.order;

    return (
        <div className="col-sm-4 my-2"> 
            <div className="card shadow-sm w-100"> 
                <div className="card-body"> 
                    <h5 className="card-tittle text-center h2">{itemName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted text-center"><b>{recentPurchase}</b> purchased recently</h6>
                    <h6 className="card-subtitle mb-2 text-muted text-center">
                    ordered <b>{Math.abs(new Date().getMinutes() - new Date(lastestPurchaseTime).getMinutes())}</b> minutes ago
                    </h6>
                </div>
            </div>
        </div> 
    );
};

export default OrderDetail;
