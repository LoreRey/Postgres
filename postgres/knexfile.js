const settings = require("./settings");

module.exports = {
  development: {
   client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database
    }
  },
};
