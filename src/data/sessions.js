const datastore = require("../services/google/datastore");

const buildKey = (id) => datastore.key(["Session", id]);

module.exports = {
  save(id, token) {
    const key = buildKey(id);
    const data = [
      {
        name: "id",
        value: id,
      },
      {
        name: "token",
        value: token,
        excludeFromIndexes: true,
      },
    ];
    return datastore.save({ key, data });
  },

  get(id) {
    const key = buildKey(id);
    return datastore.get(key).then((data) => data[0]);
  },
}
