const mongoose = require("mongoose");

const dbConnect = () => {
  const PASS = process.env.PASS;
  const DBNAME = process.env.DBNAME;
  const URI = encodeURI(process.env.MONGODB_URI
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
