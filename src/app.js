const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const dbConnect = require('./configs/db');
const {INTERNAL_SERVER_ERROR} = require('./constants/lang'); 
const { CLIENT_URI, PORT_ADDRESS, NODE_ENV} = require('./configs');

const app = express();

// app middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors());

if (NODE_ENV === 'development') {
  app.use(cors({ origin: CLIENT_URI }));
}
// import routes
const authRoutes = require('./routes/authRoutes');

// middlewares
app.use('/api/v1', authRoutes);

const PORT = PORT_ADDRESS || 5000;

app.use((err,req,res,next) => {
  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR.httpStatus; 
  const message = err.message || INTERNAL_SERVER_ERROR.message
  res.status(statusCode).json({
    status: 'failed' ,
    message
  });
});

app.listen(PORT, () => {
  console.log(`server listening at PORT ${PORT}`);
  dbConnect();
});
