
const userRoutes = require('./user.queries');
const authRoutes = require('./auth.queries');

module.exports = {
  ...userRoutes,
  ...authRoutes,
}