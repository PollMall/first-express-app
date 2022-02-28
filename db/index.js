const { getConnection } = require("./config");

async function getAll() {
  return new Promise(async (res, rej) => {
    try {
      const connection = await getConnection();
      connection.query("SELECT * FROM todos", (err, results) => {
        if (err) rej(err);
        res(results);
      });
    } catch (err) {
      rej(err);
    }
  });
}

module.exports = {
  getAll,
};
