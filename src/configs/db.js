const mongoose = require("mongoose");
const { MONGODB_URI, PASS, DBNAME } = require(".");

const dbConnect = () => {
  const URI = encodeURI(MONGODB_URI
    .replace("<password>", PASS)
    .replace("<dbname>", DBNAME));

  mongoose
    .connect(URI)
    .then((resp) => {
      // console.log(resp)
      console.log("db connection successful");
    })
    .catch((e) => console.log(e));
};

module.exports = dbConnect;
