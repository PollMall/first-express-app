const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
});

function getConnection() {
  return new Promise((res, rej) => {
    if (connection.state === "disconnected") {
      connection.connect((err) => {
        if (err) rej(err);
      });
    }

    res(connection);
  });
}

module.exports = {
  getConnection,
};
