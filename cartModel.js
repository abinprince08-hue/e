// Temporary cart storage, organised by user ID.

const carts = {};

export function getCart(userId) {
  if (!carts[userId]) {
    carts[userId] = [];
  }
  return carts[userId];
}

export function saveCart(userId, cart) {
  carts[userId] = cart;
  return carts[userId];
}

export function clearCart(userId) {
  carts[userId] = [];
}
