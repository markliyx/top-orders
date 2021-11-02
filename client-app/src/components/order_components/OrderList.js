import React, { useEffect, useState } from 'react';
import OrderDetail from './OrderDetail';
import * as OrderApi from './OrderApi';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../other_components/Loader';
import EndMessage from '../other_components/EndMessage';

function OrderList(props) {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [ordersPerPage] = useState(20);
    const [currOrders, setCurrOrders] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        // fethching order items
        OrderApi.getOrders() 
            .then(orders => {
                console.log('SUCCESS: Get orders successful.');
                setOrders(orders);
                setCurrOrders([...orders.slice(0, ordersPerPage)]);
            })
            .catch(err => {
                console.log('ERROR: Get orders failed! Error: ', err);
            });
    }, []);

    const fetchMoreData = () => {
        // adding data to infinite scroll list
        const addOrders = orders.slice(ordersPerPage * page, ordersPerPage * (page + 1))
        setCurrOrders([...currOrders, ...addOrders]);
        if ((page + 1) * ordersPerPage > orders.length) {
            setHasMore(false);
        }
        setPage(page + 1);
    };
        return (
            // returning infinitescroll component
            <InfiniteScroll
                dataLength={currOrders.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<Loader />}
                endMessage={<EndMessage />}
            >
                <div className="container"> 
                    <div className="row m-2"> 
                        {currOrders.map(order => (
                            <OrderDetail key={currOrders.indexOf(order)} order={order} /> 
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        );
}

export default OrderList;