// Orders are temporary and reset when the backend restarts.

const orders = [];

export function getAllOrders() {
  return orders;
}

export function addOrder(order) {
  orders.push(order);
  return order;
}

export function getOrdersByUser(userId) {
  return orders.filter(order => order.userId === userId);
}
