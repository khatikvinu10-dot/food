import React, { useEffect, useState } from "react";
import axios from 'axios'
import "./Transactions.css";

const Transactions = ({ url }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const res = await axios.get(url +`/api/transaction/list`);
    if (res.data.success) {
      setTransactions(res.data.data);
    }
  };

  return (
    <div className="transactions">
      <h1>All Transactions</h1>

      <div className="transaction-status">
        <ul>
            <a>ID</a>
            <a>Amount</a>
            <a>mode</a>
            <a>Status</a>
            <a>Date</a>
        </ul>

    <div className="tbody">
          {transactions.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>${item.amount}</td>
              <td>{item.paymentMethod}</td>
              <td className={item.status.toLowerCase()}>
                {item.status}
              </td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              
            </tr>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
