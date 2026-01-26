import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {

    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async (orderid = null) => {
        try {
            const response = await axios.post(
                `${url}/api/order/userOrders`,
                {
                    orderid: orderid
                },
                {
                    headers: {
                        token: token
                    }
                }
            );

            if (orderid != null) {

                let prevData = [...data];
                
                for (let index = 0; index < prevData.length; index++) {
                    const element = prevData[index];
                    if (element._id == orderid) {
                        prevData[index].status = response.data.data[0].status;
                    }
                }

                setData(prevData);

            } else {
                console.log("ELSLLLSLSLS")
                setData(response.data.data);
            }
        } catch (error) {
            console.log("Axios error:", error.response?.data || error.message);
        }
    };
    

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    const fetch = async (orderId) => {
        try {
            const response = await axios.post(
                `${url}/api/order/track`,
                { orderId }, 
                {
                    headers: {
                        token: token
                    }
                }
            );

            console.log(response.data);
        } catch (error) {
            console.log("Axios error:", error.response?.data || error.message);
        }
    };


    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => {
                    return (
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + " x " + item.quantity
                                }
                                else {
                                    return item.name + " x " + item.quantity + " , "
                                }
                            })}</p>
                            <p>${order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span><b>{order.status}</b></p>
                            <button onClick={() => fetchOrders(order._id)}>
                                Track order
                            </button>

                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default MyOrders;
