function generateOrderId(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let orderId = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    // Generate a random index and append the corresponding character
    orderId += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return orderId;
}

export default generateOrderId;