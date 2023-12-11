// userData.js
let username = '';

module.exports = {
  setUsername: (newUsername) => {
    username = newUsername;
  },
  getUsername: () => {
    return username;
  }
};