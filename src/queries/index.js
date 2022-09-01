
const userRoutes = require('./user.queries');
const authRoutes = require('./auth.queries');
const newsRoutes = require('./news.queries');

module.exports = {
  ...userRoutes,
  ...authRoutes,
  ...newsRoutes
}