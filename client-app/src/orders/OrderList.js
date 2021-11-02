import React, { useEffect, useState } from 'react';
import OrderDetail from './OrderDetail';
import * as OrderApi from './OrderApi';
import InfiniteScroll from 'react-infinite-scroll-component';

function OrderList(props) {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(2);
    const [postsPerPage, setPostsPerPage] = useState(20);
    const [indexOfLastOrder, setIndexOfLastOrder] = useState(40);
    const [currentOrders, setCurrentOrders] = useState([]);

    useEffect(() => {
        OrderApi.getOrders() 
            .then(orders => {
                console.log('SUCCESS: Get orders successful.');
                setOrders(orders);
                setCurrentOrders(orders.slice(0, 20));
            })
            .catch(err => {
                console.log('ERROR: Get orders failed! Error: ', err);
            });
    }, []);


    const fetchMoreData = async () => {
        setCurrentOrders(orders.slice(0, indexOfLastOrder));
        setPage(page + 1);
        setIndexOfLastOrder(page * postsPerPage);
    };
        return (
            <InfiniteScroll
                dataLength={currentOrders.length}
                next={fetchMoreData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <div className="container"> 
                    <div className="row m-2"> 
                        {currentOrders.map(order => (
                            <OrderDetail key={order._id} order={order} /> 
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        );
}

export default OrderList;