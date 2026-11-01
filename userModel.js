// Users are stored in memory because MongoDB is not compulsory for this task.

const users = [];

export function getAllUsers() {
  return users;
}

export function findUserByEmail(email) {
  return users.find(user => user.email === email);
}

export function findUserById(id) {
  return users.find(user => user.id === id);
}

export function addUser(user) {
  users.push(user);
  return user;
}
