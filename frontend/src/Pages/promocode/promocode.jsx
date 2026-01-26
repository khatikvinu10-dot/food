import React, { useState } from "react";
import axios from "axios";

const applyPromo = ({ orderAmount }) => {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(orderAmount);

  const applyPromo = async () => {
    const res = await axios.post("http://localhost:4000/api/promo/apply", {
      code,
      orderAmount
    });
};

    if (res.data.success) {
      setDiscount(res.data.discount);
      setFinalAmount(res.data.finalAmount);
      alert("Promo Applied 🎉");
    } else {
      alert(res.data.message);
    }
  };

const promocode = () => {
  return (
    <div>
         <h3>Apply Promo Code</h3>
      <input
        type="text"
        placeholder="Enter promo code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={applyPromo}>Apply</button>

      <p>Discount: ₹{discount}</p>
      <p>Final Amount: ₹{finalAmount}</p>
    </div>
  );
}


export default promocode;
