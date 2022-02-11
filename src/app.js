const express = require('express');

// import routes
const authRoutes = require('../routes/authRoutes');


const app = express();

// middlewares
app.use('/api', authRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server listening at port ${port}`));
